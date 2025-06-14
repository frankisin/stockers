using lostborn_backend.Helpers;
using lostborn_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace lostborn_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        // GET: api/user
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // GET: api/user/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { Message = "User not found" });

            return Ok(user);
        }
        // DELETE: api/user/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { Message = "User not found" });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User deleted", DeletedUser = user });
        }
    }
}
