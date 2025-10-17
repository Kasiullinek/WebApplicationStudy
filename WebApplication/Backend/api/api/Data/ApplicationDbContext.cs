using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class ApplicationDbContext : IdentityDbContext<UserModel>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        //// DbSet reprezentujący użytkowników
        //public DbSet<RowModel> rowModel { get; set; }

        //// DbSet reprezentujący użytkowników
        //public DbSet<SetModel> setModel { get; set; }
    }
}
