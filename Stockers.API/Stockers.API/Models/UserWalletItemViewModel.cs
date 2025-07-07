namespace Stockers.API.Models
{
    public class UserWalletItemViewModel
    {
        public string Symbol { get; set; }
        public string Name { get; set; }
        public decimal Quantity { get; set; }
        public decimal AvgPurchasePrice { get; set; }
    }

}
