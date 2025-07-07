namespace Stockers.API.Models
{
    public class UserPortfolioValue
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public Users User { get; set; }

        public decimal TotalValue { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
