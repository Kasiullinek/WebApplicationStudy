namespace api.Dtos
{
    public class RowDto
    {
        public int Id { get; set; }
        public int? SetId { get; set; }
        public string Term { get; set; } = string.Empty;
        public string Translation { get; set; } = string.Empty;
    }
}
