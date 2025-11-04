namespace api.Dtos
{
    public class SetDto
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime? CreatedAt { get; set; }

        // Lista słówek w DTO
        public List<RowDto> Rows { get; set; } = new List<RowDto>();
    }
}
