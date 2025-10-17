using api.Data;
using api.Interfaces;
using api.Models;
using api.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly UserManager<UserModel> _userManager;
        private readonly SignInManager<UserModel> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(ApplicationDbContext context,
            ITokenService tokenService,
            UserManager<UserModel> userManager,
            SignInManager<UserModel> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginVM login)
        {

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(login.Email);
            if (user == null)
            {
                return Unauthorized(new { message="Invalid Email or Password"});

            }

            var result = await _signInManager.PasswordSignInAsync(login.Email, login.Password, isPersistent: false, lockoutOnFailure: false);
            if(!result.Succeeded)
            {
                return Unauthorized(new { message = "Invalid Email or Password" });
            }

            //HttpContent.Session.SetString("username", user.UserName);

            var token = _tokenService.CreateToken(user);

            return Ok(new
            {
                message = "Login succesfully!",
                username = user.UserName,
                token = token
            });
           
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterVM register)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            if(await _userManager.Users.AnyAsync(u => u.UserName == register.Email))
            {
                return BadRequest(new { message = "User with this email already exists." });
            }

            var newUser = new UserModel
            {
                FirstName = string.Empty,
                LastName = string.Empty,
                Email = register.Email,
                UserName = register.Email,
            };

            var Registration = await _userManager.CreateAsync(newUser, register.Password);
            if (!Registration.Succeeded)
            {
                return BadRequest(new { message = "Registration failed. Please try again." });
            }

            // Przypisanie roli User nowemu użytkownikowi
            await _userManager.AddToRoleAsync(newUser, Utility.Helper.User);

            return Ok(new
            {
                message = "Registration succesful!",
                userName = newUser.UserName,
            });

        }
    }
}
