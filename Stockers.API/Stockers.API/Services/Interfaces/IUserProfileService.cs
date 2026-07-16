using Microsoft.AspNetCore.Http;
using Stockers.API.Helpers;

namespace Stockers.API.Services.Interfaces
{
    public interface IUserProfileService
    {
        Task<ServiceViewResult<string>> UploadProfileImageAsync(
            int userId,
            IFormFile file
        );
    }
}