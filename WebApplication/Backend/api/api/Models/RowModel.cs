using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class RowModel
    {
        [Key]
        [Description("Primary key for the row")]
        public int Id { get; set; }

        
        [Description("Identifier of the set")]
        public int? SetId { get; set; }
        [ForeignKey("SetId")]
        public SetModel? Set { get; set; }

        [Description("Term")]
        [Required]
        [RegularExpression(@"^[a-zA-Z\s-]*$", ErrorMessage = "Term must contain only letters, spaces and hyphens.")]
        [StringLength(40, ErrorMessage = "Length cannot go above 40.")]
        public string Term { get; set; } = string.Empty;

        [Description("Translation")]
        [Required]
        [RegularExpression(@"^[a-zA-Z\s-]*$", ErrorMessage = "Term can contain only letters, spaces, and hyphens")]
        [StringLength(40, ErrorMessage = "Length cannot go above 40.")]
        public string Translation { get; set; } = string.Empty;
    }
}
