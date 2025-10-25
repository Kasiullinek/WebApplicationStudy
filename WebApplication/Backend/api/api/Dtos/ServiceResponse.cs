namespace api.Dtos
{
    public class ServiceResponse
    {
        public record class GeneralResponse(bool Flag, string Message);
        public record class DetailedResponse(bool Flag, string Message, string Token);
    }
}
