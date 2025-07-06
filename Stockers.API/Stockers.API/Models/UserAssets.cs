namespace Stockers.API.Models
{
    public class UserAssets
    {
    public int Id { get; set; }

    public int UserId { get; set; }
    public Users User { get; set; }

    public int AssetId { get; set; }
    public Assets Asset { get; set; }

    public decimal Quantity { get; set; }
    public decimal AvgPurchasePrice { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

}
