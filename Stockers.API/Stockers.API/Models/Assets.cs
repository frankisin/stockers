namespace Stockers.API.Models
{
    public class Assets
{
    public int Id { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = "stock";  // stock, crypto, etc.
    public string Exchange { get; set; } = string.Empty;
    public decimal LatestPrice { get; set; }
    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

    public ICollection<UserAssets> UserAssets { get; set; }
}

}
