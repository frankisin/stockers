using Stockers.API.Helpers;
using Stockers.API.Models;

namespace Stockers.API.Services.Interfaces
{
    // Stockers.API.Services.Interfaces.IWalletService.cs
    public interface IWalletService
    {
        Task<ServiceViewResult<bool>> AddAssetToUserWalletAsync(AddAssetToWalletModel model);
        Task<ServiceViewResult<bool>> SellAssetAsync(SellAssetModel model);
        //Task<ServiceViewResult<List<UserAssets>>> GetUserWalletAsync(int userId); 

        Task<ServiceViewResult<List<UserAssets>>> GetUserWalletAsync(int userId);

        Task<ServiceViewResult<decimal>> GetUserPortfolioValueAsync(int userId);
}
}
