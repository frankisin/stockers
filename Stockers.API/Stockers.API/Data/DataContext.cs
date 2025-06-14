using System.Text.Json;
using lostborn_backend.Models;
using Microsoft.EntityFrameworkCore;


namespace lostborn_backend.Helpers
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions options) : base(options)
		{

		}
        public DbSet<User> Users { get; set; }

        internal Task SaveChangesAsync(JsonSerializerOptions options)
        {
            throw new NotImplementedException();
        }
    }	

   
}

