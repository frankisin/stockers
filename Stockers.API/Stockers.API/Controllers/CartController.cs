using Stockers.API.Helpers;
using Stockers.API.Models;
using Stockers.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Stockers.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CartsController : ControllerBase
    {
        private readonly DataContext _context;

        public CartsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Carts>>> GetCarts()
        {
            return await _context.Carts.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Carts>> GetCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }
        [HttpPost]
        public async Task<ActionResult<Carts>> CreateCart(Carts cart)
        {
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCart), new { id = cart.ID }, cart);
        }
        private bool CartExists(int id)
        {
            return _context.Carts.Any(c => c.ID == id);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateCart(Carts member)
        {
            _context.Entry(member).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // if (!MemberExists(id)) { return NotFound(); }
                if (!CartExists(member.ID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
                throw;
            }

            // Fetch the updated data from the database
            var updatedMember = await _context.Products.FindAsync(member.ID);

            // You can create a custom response object or use an anonymous object
            var response = new
            {
                Message = "User Cart Updated successfully",
                UpdatedData = updatedMember
            };

            // Return the custom response
            return Ok(response);
        }
        [HttpGet("{id}/cartitems")]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems(int id)
        {
            var cartItems = await _context.CartItems.Where(ci => ci.CartID == id).ToListAsync();

            if (cartItems == null || !cartItems.Any())
            {
                return NotFound();
            }

            return cartItems;
        }
        [HttpPost("{id}/cartitems")]
        public async Task<ActionResult<CartItem>> AddCartItem(int id, CartItem cartItem)
        {
            var cart = await _context.Carts.FindAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            cartItem.CartID = id;
            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCartItems), new { id }, cartItem);
        }
        [HttpDelete("{username}/cartitems/{itemId}")]
        public async Task<IActionResult> DeleteCartItem(string username, int itemId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.username == username);
            if (user == null)
                return NotFound($"User with username {username} not found");

            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserID == user.ID);
            if (cart == null)
                return NotFound($"Cart not found for user {username}");

            var cartItem = await _context.CartItems.FirstOrDefaultAsync(ci => ci.ID == itemId && ci.CartID == cart.ID);
            if (cartItem == null)
                return NotFound($"Cart item with ID {itemId} not found in user's cart");

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            var updatedItems = await _context.CartItems.Where(ci => ci.CartID == cart.ID).ToListAsync();
            return Ok(updatedItems);
        }

        [HttpPost("{username}/cart/AddToCart")]
        public async Task<IActionResult> AddToCart(string username, [FromBody] CartItemRequest payload)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.username == username);
            if (user == null)
                return NotFound($"User with username {username} not found");

            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserID == user.ID);
            if (cart == null)
            {
                cart = new Carts { UserID = user.ID };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();  // to generate cart ID
            }

            var product = await _context.Products.FindAsync(payload.ProductID);
            if (product == null)
                return NotFound($"Product with ID {payload.ProductID} not found");

            var existingItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartID == cart.ID && ci.ProductID == payload.ProductID);

            if (existingItem != null)
            {
                existingItem.Quantity += payload.Quantity;
            }
            else
            {
                var newItem = new CartItem
                {
                    Quantity = payload.Quantity,
                    CartID = cart.ID,
                    ProductID = payload.ProductID
                };
                _context.CartItems.Add(newItem);
            }

            await _context.SaveChangesAsync();

            var updatedItems = await _context.CartItems.Where(ci => ci.CartID == cart.ID).ToListAsync();
            return Ok(updatedItems);
        }

     
        [HttpPut("{cartId}/cartitems/{itemId}")]
        public async Task<IActionResult> UpdateCartItem(int cartId, int itemId, CartItem updatedCartItem)
        {
            if (cartId != updatedCartItem.CartID || itemId != updatedCartItem.ID)
            {
                return BadRequest();
            }

            _context.Entry(updatedCartItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartItemExists(itemId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        
        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout(CheckoutModel model)
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out int userId) || userId != model.UserId)
                return Unauthorized("Invalid user ID or mismatch.");

            // Get cart for user
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserID == model.UserId);
            if (cart == null)
                return NotFound(new { Message = "No active cart found for this user." });

            // Get cart items
            var cartItems = await _context.CartItems
                .Where(ci => ci.CartID == cart.ID)
                .ToListAsync();

            if (cartItems.Count == 0)
                return BadRequest(new { Message = "Cart is empty." });

            // Fetch related products
            var productIds = cartItems.Select(ci => ci.ProductID).Distinct().ToList();
            var products = await _context.Products
                .Where(p => productIds.Contains(p.ID))
                .ToDictionaryAsync(p => p.ID);

            // Calculate total
            decimal totalAmount = 0;
            foreach (var item in cartItems)
            {
                if (!products.TryGetValue(item.ProductID, out var product))
                    return BadRequest($"Product with ID {item.ProductID} not found.");

                totalAmount += item.Quantity * product.Price;
            }

            // Process payment (mocked)
            var paymentRequest = new PaymentRequest
            {
                CardNumber = model.CardNumber,
                CardExpiry = model.CardExpiry,
                Cvv = model.Cvv,
                Amount = totalAmount
            };

            var paymentResponse = new MockPaymentService().ProcessPayment(paymentRequest);
            if (!paymentResponse.IsSuccess)
            {
                return BadRequest(new { Message = "Payment Failed", Error = paymentResponse.ErrorMessage });
            }

            // Create invoice
            var invoice = new Invoice
            {
                UserID = model.UserId,
                InvoiceDate = DateTime.Now,
                TotalAmount = totalAmount,
                InvoiceNumber = GenerateInvoiceNumber(),
                PaymentStatus = "Paid",
                TransactionId = paymentResponse.TransactionId,
                InvoiceItems = cartItems.Select(ci => new InvoiceItem
                {
                    ProductID = ci.ProductID,
                    Quantity = ci.Quantity,
                    UnitPrice = products[ci.ProductID].Price
                }).ToList()
            };

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync(); // Generate InvoiceID

            // Log transactions and update stock
            foreach (var item in cartItems)
            {
                var product = products[item.ProductID];
                product.InStock -= item.Quantity;
                _context.Products.Update(product);

                _context.Transactions.Add(new Transaction
                {
                    ProductID = item.ProductID,
                    QuantityChange = -item.Quantity,
                    TransactionType = "SALE",
                    TransactionDate = DateTime.Now,
                    InvoiceID = invoice.InvoiceID
                });
            }

            await _context.SaveChangesAsync();

            // Clear cart
            _context.CartItems.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Checkout complete", Invoice = invoice });
        }

        private string GenerateInvoiceNumber()
        {
            var datePart = DateTime.Now.ToString("yyyyMMdd"); // e.g., 20230917
            var randomPart = new Random().Next(100, 999); // e.g., between 100 and 999
            return $"INV-{datePart}-{randomPart}";
        }

        private bool CartItemExists(int itemId)
        {
            return _context.CartItems.Any(ci => ci.ID == itemId);
        }
        //The purpose of this 'helper' class is to 
        //define my params for adding to a user's cart...
        //seperate class used during requests...
        public class CartItemRequest
        {
            public int Quantity { get; set; }
            public int CartID { get; set; }
            public int ProductID { get; set; }
        }
    }
}
