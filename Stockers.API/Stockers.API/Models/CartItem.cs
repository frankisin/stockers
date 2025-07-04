using System.ComponentModel.DataAnnotations;

namespace Stockers.API.Models
{
    public class CartItem
    {
        [Key]
        public int ID { get; set; }

        public int Quantity { get; set; }

        public int CartID { get; set; }  // No FK
        public int ProductID { get; set; }  // No FK
    }
}
