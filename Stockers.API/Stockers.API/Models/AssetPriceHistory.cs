namespace Stockers.API.Models
{
    public class AssetPriceHistory
    {
        public int Id { get; set; }

        public int AssetId { get; set; }
        public Assets Asset { get; set; }

        public decimal Price { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }

}
