using api.Dtos;

namespace api.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(UserSession userSession);
    }
}
