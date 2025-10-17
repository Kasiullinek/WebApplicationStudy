using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class SetModel
    {
        [Key]
        [Description("Primary key for the set")]
        public int Id { get; set; }

        [Description("Identifier of the user")]
        public string? UserId { get; set; }
        [ForeignKey("UserId")]
        public UserModel? User { get; set; }

        [Description("Title of the set")]
        [Required]
        [RegularExpression(@"^[A-Z]+[a-zA-Z\s]*$", ErrorMessage = "Title must start with an uppercase letter and contain only letters and spaces.")]
        [StringLength(40, ErrorMessage = "Length cannot go above 40.")]
        public string Title { get; set; } = "";

        [Description("Date and time of creation of the set")]
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        // Relacja 1:N - Zestaw zawiera wiele słówek (RowModel)
        public ICollection<RowModel> Rows { get; set; } = new List<RowModel>();
    }
}
