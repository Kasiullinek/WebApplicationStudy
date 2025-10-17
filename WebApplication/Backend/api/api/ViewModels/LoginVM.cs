using System.ComponentModel.DataAnnotations;

namespace api.ViewModels
{
    // Model widoku dla formularza logowania
    public class LoginVM
    {
        // Adres email użytkownika
        [Required(ErrorMessage = "Email is missing!")]
        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }

        // Hasło użytkownika
        [Required(ErrorMessage = "Password is missing!")]
        [DataType(DataType.Password)]
        public string? Password { get; set; }
    }
}
