using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace lostborn_backend.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("firstname")]
        public string FirstName { get; set; }

        [Column("lastname")]
        public string LastName { get; set; }

        [Column("streetaddress")]
        public string StreetAddress { get; set; }

        [Column("city")]
        public string City { get; set; }

        [Column("zipcode")]
        public string ZipCode { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("username")]
        public string Username { get; set; }

        [Column("password")]
        public string Password { get; set; }

        [Column("role")]
        public string Role { get; set; }


    }
}
