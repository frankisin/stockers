using System.Text.Json;
using Stockers.API.Models;
using Microsoft.EntityFrameworkCore;


namespace Stockers.API.Helpers
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions options) : base(options)
		{

		}
        public DbSet<IPAccess> Access { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Carts> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceItem>InvoiceItems { get; set; }
        public DbSet<Transaction>Transactions { get; set; }
        public DbSet<PaymentMethod>PaymentMethods { get; set; }
        public DbSet<ShippingAddress>ShippingAddresses { get; set; }
        public DbSet<CasinoTransaction> CasinoTransactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
               modelBuilder.Entity<Users>()
                    .ToTable("users")
                    .Property(u => u.ID)
                    .HasColumnName("id");

                modelBuilder.Entity<Products>()
                    .ToTable("products")
                    .Property(p => p.ID).HasColumnName("id");

                modelBuilder.Entity<Carts>()
                    .ToTable("carts")
                    .Property(c => c.ID).HasColumnName("id");

                modelBuilder.Entity<CartItem>()
                    .ToTable("cartitems")
                    .Property(ci => ci.ID).HasColumnName("id");



            base.OnModelCreating(modelBuilder);
        }

        internal Task SaveChangesAsync(JsonSerializerOptions options)
        {
            throw new NotImplementedException();
        }
    }	   
}
