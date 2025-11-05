using api.Dtos;
using static api.Dtos.ServiceResponse;
using api.Interfaces;
using api.Data;
using Microsoft.EntityFrameworkCore;
using api.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using api.Utility;

namespace api.Repositories
{
    public class VocabularySetRepo : IVocabularySet
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly int _maxSetsPerUser = 30;
        private readonly int _maxRowsPerSet = 50;
        private readonly int _minRowsPerSet = 2;

        public VocabularySetRepo(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        // Pobiera ID użytkownika z JWT
        private string? GetUserId()
        {
            return _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? _httpContextAccessor.HttpContext?.User?.FindFirstValue(JwtRegisteredClaimNames.Sub);
        }

        // Pobiera ID administratora
        private async Task<string?> GetAdminId()
        {
            var adminRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == Roles.Admin);
            if (adminRole == null)
            {
                return null;
            }

            var admin = await _context.UserRoles.FirstOrDefaultAsync(ur => ur.RoleId == adminRole.Id);
            if (admin == null)
            {
                return null;
            }

            return admin.UserId;
        }


        // GET: Wszystkie podstawowe zestawy
        public async Task<IEnumerable<SetDto>> GetBasicSets()
        {
            var adminId = await GetAdminId();
            if (adminId == null)
            {
                return new List<SetDto>();
            }

            return await _context.Sets
                .Where(s => s.UserId == adminId)
                .Select(s => new SetDto
                {
                    Id = s.Id,
                    UserId = s.UserId,
                    Title = s.Title,
                    CreatedAt = s.CreatedAt,
                    Rows = _context.Rows
                        .Where(r => r.SetId == s.Id)
                        .Select(r => new RowDto
                        {
                            Id = r.Id,
                            SetId = r.SetId,
                            Term = r.Term,
                            Translation = r.Translation
                        }).ToList()
                }).ToListAsync();
        }

        // GET: Pojedynczy podstawowy zestaw
        public async Task<SetDto> GetBasicSet(int setId)
        {
            var adminId = await GetAdminId();
            if (adminId == null)
            {
                return new SetDto();
            }

            var set = await _context.Sets.FirstOrDefaultAsync(s => s.Id == setId && s.UserId == adminId);
            if (set is null)
            {
                return null;
            }

            return new SetDto
            {
                Id = set.Id,
                UserId = set.UserId,
                Title = set.Title,
                CreatedAt = set.CreatedAt,
                Rows = await _context.Rows
                    .Where(r => r.SetId == set.Id)
                    .Select(r => new RowDto
                    {
                        Id = r.Id,
                        SetId = r.SetId,
                        Term = r.Term,
                        Translation = r.Translation
                    }).ToListAsync()
            };
        }

        // GET: Wszystkie zestawy użytkownika
        public async Task<IEnumerable<SetDto>> GetUserSets()
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == GetUserId());
            if (user is null)
            {
                return null;
            }

            return await _context.Sets
                .Where(s => s.UserId == GetUserId())
                .Select(s => new SetDto
                {
                    Id = s.Id,
                    UserId = s.UserId,
                    Title = s.Title,
                    CreatedAt = s.CreatedAt,
                    Rows = _context.Rows
                        .Where(r => r.SetId == s.Id)
                        .Select(r => new RowDto
                        {
                            Id = r.Id,
                            SetId = r.SetId,
                            Term = r.Term,
                            Translation = r.Translation
                        }).ToList()
                }).ToListAsync();
        }

        // GET: Pojedynczy zestaw użytkownika
        public async Task<SetDto> GetUserSet(int setId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == GetUserId());
            if (user is null)
            {
                return null;
            }

            var set = await _context.Sets.FirstOrDefaultAsync(s => s.Id == setId && s.UserId == user.Id);
            if (set is null)
            {
                return null;
            }

            return new SetDto
            {
                Id = set.Id,
                UserId = set.UserId,
                Title = set.Title,
                CreatedAt = set.CreatedAt,
                Rows = await _context.Rows
                    .Where(r => r.SetId == set.Id)
                    .Select(r => new RowDto
                    {
                        Id = r.Id,
                        SetId = r.SetId,
                        Term = r.Term,
                        Translation = r.Translation
                    }).ToListAsync()
            };
        }

        // POST: Aktualizacja zestawu
        public async Task<GeneralResponse> UpdateSet(SetDto setDto)
        {
            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == GetUserId());
            if (currentUser is null)
            {
                return new GeneralResponse(false, "Current user not found!");
            }

            var set = await _context.Sets.Include(s => s.Rows).FirstOrDefaultAsync(s => s.Id == setDto.Id && s.UserId == currentUser.Id);
            if (set is null)
            {
                return new GeneralResponse(false, "Set not found or not owned by current user!");
            }

            set.Title = setDto.Title;
            foreach (var rowDto in setDto.Rows)
            {
                var existingRow = set.Rows.FirstOrDefault(r => r.Id == rowDto.Id);

                if (existingRow is null)
                {
                    return new GeneralResponse(false, "Row is empty!");
                    
                }

                existingRow.Term = rowDto.Term;
                existingRow.Translation = rowDto.Translation;
            }

            await _context.SaveChangesAsync();
            return new GeneralResponse(true, "Set updated successfully.");
        }

        // POST: Dodawanie nowego zestawu
        public async Task<GeneralResponse> AddSet(SetDto setDto)
        {
            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == GetUserId());
            if (currentUser is null)
            {
                return new GeneralResponse(false, "Current user not found!");
            }

            var assignedUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == setDto.UserId);
            if (assignedUser != currentUser)
            {
                return new GeneralResponse(false, "You cannot create sets for another user!");
            }


            if (setDto.Rows == null || setDto.Rows.Count < _minRowsPerSet)
            {
                return new GeneralResponse(false, $"A set must contain at least {_minRowsPerSet} flashcards (rows).");
            }

            var userSetCount = await _context.Sets.CountAsync(s => s.UserId == currentUser.Id);
            if (userSetCount >= _maxSetsPerUser)
            {
                return new GeneralResponse(false, $"Cannot contain more than {_maxSetsPerUser} sets.");
            }

            if (setDto.Rows.Count > _maxRowsPerSet)
            {
                return new GeneralResponse(false, $"A set cannot contain more than {_maxRowsPerSet} flashcards (rows).");
            }

            var newSet = new SetModel
            {
                UserId = currentUser.Id,
                Title = setDto.Title,
                CreatedAt = DateTime.UtcNow,
                Rows = setDto.Rows.Select(r => new RowModel
                {
                    Term = r.Term,
                    Translation = r.Translation
                }).ToList()
            };

            _context.Sets.Add(newSet);
            await _context.SaveChangesAsync();

            return new GeneralResponse(true, "Set created successfully.");
        }

        // POST: Dodawanie nowego wiersza do zestawu
        public async Task<GeneralResponse> AddRow(RowDto rowDto)
        {
            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == GetUserId());
            if (currentUser is null)
            {
                return new GeneralResponse(false, "Current user not found!");
            }

            var set = await _context.Sets.Include(s => s.Rows).FirstOrDefaultAsync(s => s.Id == rowDto.SetId && s.UserId == currentUser.Id);
            if (set is null)
            {
                return new GeneralResponse(false, "Set not found or not owned by current user!");
            }

            if (set.Rows.Count >= _maxRowsPerSet)
            {
                return new GeneralResponse(false, $"Cannot add more than {_maxRowsPerSet} rows to one set.");
            }

            var newRow = new RowModel
            {
                SetId = set.Id,
                Term = rowDto.Term,
                Translation = rowDto.Translation
            };

            _context.Rows.Add(newRow);
            await _context.SaveChangesAsync();

            return new GeneralResponse(true, "Row added successfully.");
        }

        // DELETE: Usuwanie zestawu
        public async Task<GeneralResponse> DeleteSet(int setId)
        {
            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == GetUserId());
            if (currentUser is null)
            {
                return new GeneralResponse(false, "Current user not found!");
            }

            var set = await _context.Sets.Include(s => s.Rows).FirstOrDefaultAsync(s => s.Id == setId && s.UserId == currentUser.Id);
            if (set is null)
            {
                return new GeneralResponse(false, "Set not found or not owned by current user!");
            }

            _context.Sets.Remove(set);
            await _context.SaveChangesAsync();

            return new GeneralResponse(true, "Set deleted successfully.");
        }

        // DELETE: Usuwanie wiersza ze zestawu
        public async Task<GeneralResponse> DeleteRow(int rowId, int setId)
        {
            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == GetUserId());
            if (currentUser is null)
            {
                return new GeneralResponse(false, "Current user not found!");
            }

            var set = await _context.Sets.Include(s => s.Rows).FirstOrDefaultAsync(s => s.Id == setId && s.UserId == currentUser.Id);
            if (set is null)
            {
                return new GeneralResponse(false, "Set not found or not owned by current user!");
            }

            if (set.Rows.Count <= _minRowsPerSet)
            {
                return new GeneralResponse(false, $"A set must contain at least {_minRowsPerSet} flashcards. You cannot delete more rows.");
            }

            var row = set.Rows.FirstOrDefault(r => r.Id == rowId);
            if (row is null)
            {
                return new GeneralResponse(false, "Row not found in this set!");
            }

            _context.Rows.Remove(row);
            await _context.SaveChangesAsync();

            return new GeneralResponse(true, "Row deleted successfully.");
        }

    }
}
