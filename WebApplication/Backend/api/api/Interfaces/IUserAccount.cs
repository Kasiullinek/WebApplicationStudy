using api.Dtos;
using static api.Dtos.ServiceResponse;

namespace api.Interfaces
{
    public interface IUserAccount
    {
        Task<GeneralResponse> RegisterAccount(RegisterDto registerDto);
        Task<DetailedResponse> LoginAccount(LoginDto loginDto);
    }
}
