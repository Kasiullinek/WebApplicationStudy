using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class LoginDto
    {
        public string? Id { get; set; }

        [Required(ErrorMessage = "Email is missing!")]
        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is missing!")]
        [DataType(DataType.Password)]
        public string? Password { get; set; }
    }
}
