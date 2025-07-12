namespace Stockers.API.Models
{
    public class UserPortfolioValue
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public Users User { get; set; }

        public DateTime Date { get; set; } // Tracks the day of the value

        public decimal Open { get; set; }  // First portfolio value of the day
        public decimal High { get; set; }  // Highest value throughout the day
        public decimal Low { get; set; }   // Lowest value throughout the day
        public decimal Close { get; set; } // Latest value (last snapshot)
    }
}
