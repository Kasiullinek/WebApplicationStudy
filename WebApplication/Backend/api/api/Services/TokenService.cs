using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        public TokenService(IConfiguration config)
        {
            _config = config ?? throw new ArgumentException(nameof(config));
        }
        public string CreateToken(UserSession userSession)
        {
            var secretKey = _config["Jwt:TokenKey"];

            if (string.IsNullOrEmpty(secretKey))
            {
                throw new ArgumentNullException("Token key is missing from the configuration.");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                //new Claim(JwtRegisteredClaimNames.Sub, userSession.Id!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, userSession.Id!),
                new Claim(ClaimTypes.Name, userSession.UserName!),
                new Claim(ClaimTypes.GivenName, userSession.FirstName!),
                new Claim(ClaimTypes.Surname, userSession.LastName!),
                new Claim(ClaimTypes.Email, userSession.Email!),
                new Claim(ClaimTypes.Role, userSession.Role!)

            };

            var token = new JwtSecurityToken
                (
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(60),
                    signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}
