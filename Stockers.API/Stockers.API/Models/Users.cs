using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Stockers.API.Models
{
    public class Users
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID { get; set; }

    [Required]
    public string firstName { get; set; }

    [Required]
    public string lastName { get; set; }

    [Required]
    public string streetAddress { get; set; }

    [Required]
    public string city { get; set; }

    [Required]
    public string zipCode { get; set; }
    [Required]
    public string state {get;set;}

    [Required]
    public string email { get; set; }
    [Required]
    public string phoneNumber {get;set;}

    [Required]
    public string username { get; set; }

    [Required]
    public string password { get; set; }

    [Required]
    public string Role { get; set; }

    [Required]
    public decimal userBalance { get; set; }
    public string? profileImageUrl { get; set; }
    public ICollection<UserAssets> UserAssets { get; set; }

    public ICollection<UserPortfolioValue> PortfolioHistory { get; set; }

    public decimal? PortfolioValue { get; set; }


    public Users() { }

    public Users(string firstName, string lastName, string streetAddress, string city, string state, string zipCode, string phoneNumber, string profileImageUrl, string email, string username, string password, string Role, decimal userBalance)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.streetAddress = streetAddress;
        this.city = city;
        this.zipCode = zipCode;
        this.email = email;
        this.username = username;
        this.password = password;
        this.Role = Role;
        this.userBalance = userBalance;
        this.state = state;
        this.phoneNumber = phoneNumber;
        this.profileImageUrl = profileImageUrl;
    }
}

}