using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Utility
{
    public static class AdminHelper
    {
        // Pobiera ID administratora
        public static async Task<string?> GetAdminIdAsync(ApplicationDbContext context)
        {
            var adminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == Roles.Admin);
            if (adminRole == null)
            {
                return null;
            }

            var admin = await context.UserRoles.FirstOrDefaultAsync(ur => ur.RoleId == adminRole.Id);
            if (admin == null)
            {
                return null;
            }

            return admin.UserId;
        }
    }
}
