using Microsoft.EntityFrameworkCore;
using Stockers.API.Helpers;
using Stockers.API.Services.Interfaces;
using Stockers.API.Utilities;

namespace Stockers.API.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _environment;

        public UserProfileService(
            DataContext context,
            IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<ServiceViewResult<string>> UploadProfileImageAsync(
            int userId,
            IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return new ServiceViewResult<string>
                {
                    Success = false,
                    Message = "No image was provided."
                };
            }

            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.ID == userId);

            if (user == null)
            {
                return new ServiceViewResult<string>
                {
                    Success = false,
                    Message = "User not found."
                };
            }

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            var allowedExtensions = new[]
            {
                ".jpg",
                ".jpeg",
                ".png",
                ".webp"
            };

            if (!allowedExtensions.Contains(extension))
            {
                return new ServiceViewResult<string>
                {
                    Success = false,
                    Message = "Only JPG, PNG, and WebP files are allowed."
                };
            }

            if (file.Length > 5 * 1024 * 1024)
            {
                return new ServiceViewResult<string>
                {
                    Success = false,
                    Message = "Image cannot exceed 5 MB."
                };
            }

            var webRootPath = _environment.WebRootPath;

            if (string.IsNullOrWhiteSpace(webRootPath))
            {
                webRootPath = Path.Combine(
                    _environment.ContentRootPath,
                    "wwwroot"
                );
            }

            var uploadFolder = Path.Combine(
                webRootPath,
                "uploads",
                "profiles"
            );

            Directory.CreateDirectory(uploadFolder);

            var fileName = $"{Guid.NewGuid():N}{extension}";
            var fullPath = Path.Combine(uploadFolder, fileName);

            await using (var stream = new FileStream(
                fullPath,
                FileMode.CreateNew))
            {
                await file.CopyToAsync(stream);
            }

            var imageUrl = $"/uploads/profiles/{fileName}";

            user.profileImageUrl = imageUrl;

            await _context.SaveChangesAsync();

            return new ServiceViewResult<string>
            {
                Success = true,
                Message = "Profile image uploaded successfully.",
                Data = imageUrl
            };
        }
    }
}