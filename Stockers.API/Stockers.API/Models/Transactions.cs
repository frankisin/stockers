using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stockers.API.Models
{
    public class UserAssetTransaction
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string AssetSymbol { get; set; }
        public decimal Quantity { get; set; }
        public decimal PricePerShare { get; set; }
        public DateTime Timestamp { get; set; }
        public string Type { get; set; } // "buy" or "sell"
    }

}

