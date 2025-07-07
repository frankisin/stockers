using Microsoft.EntityFrameworkCore;
using Stockers.API.Helpers;
using Stockers.API.Models;
using Stockers.API.Services.Interfaces;

public class WalletService : IWalletService
{
    private readonly DataContext _context;

    private readonly YahooFinanceService _yahooFinanceService;

    public WalletService(DataContext context, YahooFinanceService yahooService)
    {
        _context = context;
        _yahooFinanceService = yahooService;
    }

    public async Task<ServiceViewResult<bool>> AddAssetToUserWalletAsync(AddAssetToWalletModel model)
    {
        var result = new ServiceViewResult<bool>();

        try
        {
            //validate the asset and see if table supports it...
            var asset = await _context.Assets.FirstOrDefaultAsync(a => a.Symbol == model.AssetSymbol);
            if (asset == null)
            {
                result.ValidationErrors.Add("Asset : Asset not found.");
                return result;
            }

            var user = await _context.Users.Include(u => u.UserAssets)
                .FirstOrDefaultAsync(u => u.ID == model.UserId);
            if (user == null)
            {
                result.ValidationErrors.Add("User : User not found.");
                return result;
            }

            var quote = await _yahooFinanceService.GetQuoteAsync(model.AssetSymbol);
            if (quote == null || !quote.HasValue)
            {
                result.ValidationErrors.Add("Price : Could not retrieve asset price.");
                return result;
            }

            var currentPrice = quote.Value;
            var totalCost = currentPrice * model.Quantity;

            if (user.userBalance < totalCost)
            {
                result.ValidationErrors.Add("Balance : Insufficient funds to complete purchase.");
                return result;
            }

            // Deduct cost from user balance
            user.userBalance -= totalCost;

            var existing = await _context.UserAssets
                .FirstOrDefaultAsync(ua => ua.UserId == model.UserId && ua.AssetId == asset.Id);

            if (existing != null)
            {
                var totalQuantity = existing.Quantity + model.Quantity;
                var existingTotalCost = existing.Quantity * existing.AvgPurchasePrice;

                existing.Quantity = totalQuantity;
                existing.AvgPurchasePrice = (existingTotalCost + totalCost) / totalQuantity;
            }
            else
            {
                _context.UserAssets.Add(new UserAssets
                {
                    UserId = model.UserId,
                    AssetId = asset.Id,
                    Quantity = model.Quantity,
                    AvgPurchasePrice = currentPrice,
                    CreatedAt = DateTime.UtcNow
                });
            }

            _context.Transactions.Add(new UserAssetTransaction
            {
                UserId = model.UserId,
                AssetSymbol = model.AssetSymbol,
                Quantity = model.Quantity,
                PricePerShare = currentPrice,
                Type = "buy",
                Timestamp = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
            result.Data = true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[BUY ERROR]: {ex.Message}\n{ex.StackTrace}");
            result.Notifications.Add(NotificationType.Error, "Unexpected error while purchasing asset.");
        }

        return result;
    }

    public async Task<ServiceViewResult<bool>> SellAssetAsync(SellAssetModel model)
    {
        var result = new ServiceViewResult<bool>();

        try
        {
            var asset = await _context.Assets.FirstOrDefaultAsync(a => a.Symbol == model.AssetSymbol);
            if (asset == null)
            {
                result.ValidationErrors.Add("Asset : Asset not found.");
                return result;
            }

            var userAsset = await _context.UserAssets
                .FirstOrDefaultAsync(ua => ua.UserId == model.UserId && ua.AssetId == asset.Id);
            if (userAsset == null)
            {
                result.ValidationErrors.Add("Wallet : User does not own this asset.");
                return result;
            }

            if (userAsset.Quantity < model.QuantityToSell)
            {
                result.ValidationErrors.Add("Quantity : Not enough shares to sell.");
                return result;
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.ID == model.UserId);
            if (user == null)
            {
                result.ValidationErrors.Add("User : User not found.");
                return result;
            }

            // Get current market price from Yahoo
            var quote = await _yahooFinanceService.GetQuoteAsync(model.AssetSymbol);
            if (quote == null || !quote.HasValue)
            {
                result.ValidationErrors.Add("Price : Could not retrieve current price.");
                return result;
            }

            var currentPrice = quote.Value;

            // Subtract sold quantity
            userAsset.Quantity -= model.QuantityToSell;
            if (userAsset.Quantity == 0)
            {
                _context.UserAssets.Remove(userAsset);
            }

            // Credit proceeds to user
            var proceeds = model.QuantityToSell * currentPrice;
            user.userBalance += proceeds;

            // Log transaction
            _context.Transactions.Add(new UserAssetTransaction
            {
                UserId = model.UserId,
                AssetSymbol = model.AssetSymbol,
                Quantity = model.QuantityToSell,
                PricePerShare = currentPrice,
                Type = "sell",
                Timestamp = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();
            result.Data = true;
        }
        catch (Exception ex)
        {
            result.Notifications.Add(NotificationType.Error, "Unexpected error during sale.");
        }

        return result;
    }

    public async Task<ServiceViewResult<List<UserAssets>>> GetUserWalletAsync(int userId)
    {
        var result = new ServiceViewResult<List<UserAssets>>();

        try
        {
            var walletItems = await _context.UserAssets
        .Include(ua => ua.Asset) // Include the Asset info
        .Where(ua => ua.UserId == userId)
        .ToListAsync();

            result.Data = walletItems;
        }
        catch (Exception ex)
        {
            result.Notifications.Add(NotificationType.Error, "Error loading wallet.");
        }

        return result;
    }

}
