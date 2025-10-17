using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace api.Models
{
    public class UserModel : IdentityUser
    {
        [Display(Name = "First Name")]
        [StringLength(50, ErrorMessage = "First name cannot be longer than 50 characters.")]
        [Description("First name of the user")]
        public string FirstName { get; set; } = string.Empty;


        [Display(Name = "Last Name")]
        [StringLength(50, ErrorMessage = "Last name cannot be longer than 50 characters.")]
        [Description("Last name of the user")]
        public string LastName { get; set; } = string.Empty;

        //Relacja 1:N - Użytkownik może mieć wiele zestawów
        public ICollection<SetModel> Sets { get; set; } = new List<SetModel>();
    }
}
