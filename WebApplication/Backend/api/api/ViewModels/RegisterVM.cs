using api.Models;
using System.ComponentModel.DataAnnotations;

namespace api.ViewModels
{
    // Model widoku dla formularza rejestracji
    public class RegisterVM
    {
        //// Model użytkownika
        //public UserModel? userModel { get; set; }

        // Adres email użytkownika
        [Required(ErrorMessage = "Email is missing!")]
        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }

        // Hasło użytkownika
        [Required(ErrorMessage = "Password is missing!")]
        [DataType(DataType.Password)]
        [StringLength(40, MinimumLength = 8, ErrorMessage = "The {0} must be at {2} and at max {1} characters long!")]
        public string? Password { get; set; }

        // Potwierdzenie hasła użytkownika
        [Required(ErrorMessage = "Confirmation Password is missing!")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Passwords Do Not Match!")]
        [Display(Name = "Confirm Password")]
        public string? ConfirmPassword { get; set; }
    }
}
