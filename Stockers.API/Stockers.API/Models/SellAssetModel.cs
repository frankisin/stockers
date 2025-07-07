namespace Stockers.API.Models
{
    public class SellAssetModel
{
    public int UserId { get; set; }
    public string AssetSymbol { get; set; }
    public decimal QuantityToSell { get; set; }
}

}
