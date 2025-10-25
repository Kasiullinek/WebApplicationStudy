using api.Interfaces;
using api.Dtos;
using Microsoft.AspNetCore.Identity;
using static api.Dtos.ServiceResponse;
using api.Models;

namespace api.Repositories
{
    public class AccountRepo : IUserAccount
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<UserModel> _userManager;

        public AccountRepo(ITokenService tokenService, UserManager<UserModel> userManager)
        {
            _tokenService = tokenService;
            _userManager = userManager;
        }

        public async Task<DetailedResponse> LoginAccount(LoginDto loginDto)
        {

            if (loginDto == null)
            {
                return new DetailedResponse(false, "Login form Empty!", null!);
            }

            var getUser = await _userManager.FindByEmailAsync(loginDto.Email);
            if (getUser == null)
            {
                return new DetailedResponse(false, "User not found!", null!);

            }

            bool checkUserPassword = await _userManager.CheckPasswordAsync(getUser, loginDto.Password);
            if (!checkUserPassword)
            {
                return new DetailedResponse(false, "Email or Password is Invalid", null!);
            }

            var getRoles = await _userManager.GetRolesAsync(getUser);
            var userSession = new UserSession(getUser.Id, getUser.UserName, getUser.FirstName, getUser.LastName, getUser.Email, getRoles.First());
            var token = _tokenService.CreateToken(userSession);
            return new DetailedResponse(true, "Loin Completed!", token!);

        }

        public async Task<GeneralResponse> RegisterAccount(RegisterDto registerDto)
        {
            if (registerDto == null)
            {
                return new GeneralResponse(false, "Login form Empty!");
            }

            var newUser = new UserModel
            {
                UserName = registerDto.Email,
                FirstName = string.Empty,
                LastName = string.Empty,
                Email = registerDto.Email,
                PasswordHash = registerDto.Password
                
            };

            var user = await _userManager.FindByEmailAsync(newUser.Email);

            if (user != null)
            {
                return new GeneralResponse(false, "User with this email already exists!");
            }

            var createUser = await _userManager.CreateAsync(newUser, registerDto.Password);
            if (!createUser.Succeeded)
            {
                return new GeneralResponse(false, "Registration failed... Please try again.");
            }

            await _userManager.AddToRoleAsync(newUser, Utility.Roles.User);
            return new GeneralResponse(true, "Account created!");

        }
    }
}
