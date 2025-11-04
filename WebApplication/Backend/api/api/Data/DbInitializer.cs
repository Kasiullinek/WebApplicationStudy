using api.Interfaces;
using api.Models;
using api.Utility;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class DbInitializer : IDbInitializer
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<UserModel> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public DbInitializer(ApplicationDbContext context, 
            UserManager<UserModel> userManager, 
            RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public void Initialize()
        {
            try
            {
                if (_context.Database.GetPendingMigrations().Count() > 0)
                {
                    _context.Database.Migrate();
                }
            }
            catch (Exception e) {}

            if (_context.Roles.Any(x => x.Name == Utility.Roles.Admin))
            {
                return;
            }

            _roleManager.CreateAsync(new IdentityRole(Utility.Roles.Admin)).GetAwaiter().GetResult();
            _roleManager.CreateAsync(new IdentityRole(Utility.Roles.User)).GetAwaiter().GetResult();

            _userManager.CreateAsync(new UserModel
            {
                UserName = "admin@gmail.com",
                Email = "admin@gmail.com",
                EmailConfirmed = true,
                FirstName = "Admin"
            }, "Admin123!").GetAwaiter().GetResult();

            UserModel admin = _context.Users.FirstOrDefault(x => x.Email == "admin@gmail.com");
            _userManager.AddToRoleAsync(admin, Utility.Roles.Admin).GetAwaiter().GetResult();

            // Seed initial vocabulary data for Admin
            if (!_context.Sets.Any())
            {
                var adminId = admin.Id;
                Vocabulary.InitializeSets(_context, adminId);
            }

        }

    }
}
