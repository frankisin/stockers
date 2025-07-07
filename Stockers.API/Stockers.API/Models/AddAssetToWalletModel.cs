namespace Stockers.API.Models
{
    public class AddAssetToWalletModel
    {
        public int UserId { get; set; }
        public string AssetSymbol { get; set; }
        public decimal Quantity { get; set; }
    }


}
