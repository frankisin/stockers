using Stockers.API.Helpers;
using Stockers.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Threading.Tasks;

namespace Stockers.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly DataContext dataContext;

        public UserController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        // API Call to get all users...
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await dataContext.Users.Include(u => u.UserAssets)
            .ThenInclude(ua => ua.Asset).Include(u => u.PortfolioHistory).ToListAsync();
            return Ok(users);
        }
        [HttpGet("Balance/{ID}")]
        public async Task<IActionResult> GetUserBalance(int ID)
        {
            var user = await dataContext.Users.FindAsync(ID);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            return Ok(new { user.userBalance });
        }
        [HttpPut("UpdateBalance/{id}")]
        public async Task<IActionResult> UpdateUserBalance(int id, [FromBody] decimal balanceChange)
        {
            // Find the user by ID
            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.ID == id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Increment or decrement the balance
            user.userBalance += balanceChange;

            try
            {
                // Save changes to the database
                await dataContext.SaveChangesAsync();
                return Ok(new { message = "Balance updated successfully", userBalance = user.userBalance });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("{ID}")]
        public async Task<ActionResult<Users>> GetUser(int ID)
        {
            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.ID == ID);
            if (user == null)
                return NotFound();

            // Ensure the user has a cart
            var existingCart = await dataContext.Carts.FirstOrDefaultAsync(c => c.UserID == user.ID);
            if (existingCart == null)
            {
                var newCart = new Carts { UserID = user.ID };
                dataContext.Carts.Add(newCart);
                await dataContext.SaveChangesAsync();
            }

            return user;
        }

        [HttpGet("ByUsername/{username}/Cart")]
        public async Task<IActionResult> GetUserCart(string username)
        {
            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.username == username);
            if (user == null)
                return NotFound();

            // Find or create user's cart
            var cart = await dataContext.Carts.FirstOrDefaultAsync(c => c.UserID == user.ID);
            if (cart == null)
            {
                cart = new Carts { UserID = user.ID };
                dataContext.Carts.Add(cart);
                await dataContext.SaveChangesAsync();
            }

            // Load cart items + products manually
            var cartItems = await dataContext.CartItems
                .Where(ci => ci.CartID == cart.ID)
                .Join(dataContext.Products,
                    ci => ci.ProductID,
                    p => p.ID,
                    (ci, p) => new
                    {
                        ci.ID,
                        ci.Quantity,
                        ci.ProductID,
                        Product = p
                    })
                .ToListAsync();

            return Ok(new
            {
                User = user,
                Cart = new
                {
                    cart.ID,
                    cart.UserID,
                    CartItems = cartItems
                }
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] UserSignUpDto userDto)
        {
            var user = new Users
            {
                firstName = userDto.firstName,
                lastName = userDto.lastName,
                streetAddress = userDto.streetAddress,
                city = userDto.city,
                zipCode = userDto.zipCode,
                email = userDto.email,
                username = userDto.username,
                password = BCrypt.Net.BCrypt.HashPassword(userDto.password),
                Role = userDto.Role,
                userBalance = 0
            };

            await dataContext.Users.AddAsync(user);
            await dataContext.SaveChangesAsync();

            // Then create the cart
            var cart = new Carts { UserID = user.ID };
            dataContext.Carts.Add(cart);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction(nameof(AddUser), user);
        }

        [HttpPut]
        public async Task<IActionResult> PutUser(UpdateUserDto userDto)
        {
            if (userDto == null)
                return BadRequest("Invalid user data");

            var existingUser = await dataContext.Users.FindAsync(userDto.ID);
            if (existingUser == null)
                return NotFound();

            existingUser.firstName = userDto.firstName;
            existingUser.lastName = userDto.lastName;
            existingUser.streetAddress = userDto.streetAddress;
            existingUser.city = userDto.city;
            existingUser.zipCode = userDto.zipCode;
            existingUser.email = userDto.email;
            existingUser.username = userDto.username;
            existingUser.password = userDto.password;
            existingUser.Role = userDto.Role;

            await dataContext.SaveChangesAsync();

            return Ok(new
            {
                Message = "Record Updated successfully",
                UpdatedData = existingUser
            });
        }


        // Helper function to check if a user is present..
        private bool UserExists(int id)
        {
            return dataContext.Users.Any(e => e.ID == id);
        }

        public class UpdateUserDto
        {
            public int ID { get; set; }
            public string firstName { get; set; }
            public string lastName { get; set; }
            public string streetAddress { get; set; }
            public string city { get; set; }
            public string zipCode { get; set; }
            public string email { get; set; }
            public string username { get; set; }
            public string password { get; set; }
            public string Role { get; set; }
        }

        // API Call to delete a user using Id...(DELETE)
        [HttpDelete("{ID}")]
        public async Task<IActionResult> DeleteUser(int ID)
        {
            var user = await dataContext.Users.FindAsync(ID);

            if (user == null)
            {
                return NotFound();
            }

            dataContext.Users.Remove(user);
            await dataContext.SaveChangesAsync();

            // You can create a custom response object or use an anonymous object
            var response = new
            {
                Message = "Record Deleted successfully",
                DeletedData = user
            };

            // Return the custom response
            return Ok(response);
        }
        public class UserSignUpDto
        {
            public string firstName { get; set; }
            public string lastName { get; set; }
            public string streetAddress { get; set; }
            public string city { get; set; }
            public string zipCode { get; set; }
            public string email { get; set; }
            public string username { get; set; }
            public string password { get; set; }
            public string Role { get; set; }
        }

    }
}
