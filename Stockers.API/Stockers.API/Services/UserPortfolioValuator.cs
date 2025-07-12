using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Stockers.API.Helpers;
using Stockers.API.Models;

namespace Stockers.API.Services
{
    public class UserPortfolioValuator : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<UserPortfolioValuator> _logger;

        public UserPortfolioValuator(IServiceScopeFactory scopeFactory, ILogger<UserPortfolioValuator> logger)
        {
            _scopeFactory = scopeFactory;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _scopeFactory.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<DataContext>();

                var users = await db.Users
                    .Include(u => u.UserAssets)
                        .ThenInclude(ua => ua.Asset)
                    .ToListAsync();

                foreach (var user in users)
                {
                    decimal totalValue = 0;

                    foreach (var ua in user.UserAssets)
                    {
                        if (ua.Asset != null)
                        {
                            decimal latestPrice = ua.Asset.LatestPrice;

                            // Fallback: if LatestPrice is 0, fetch from AssetPriceHistory
                            if (latestPrice <= 0)
                            {
                                latestPrice = await db.AssetPriceHistory
                                    .Where(p => p.AssetId == ua.AssetId)
                                    .OrderByDescending(p => p.Date)
                                    .Select(p => (decimal?)p.Close)
                                    .FirstOrDefaultAsync() ?? 0;
                            }

                            if (latestPrice > 0)
                            {
                                totalValue += ua.Quantity * latestPrice;
                            }
                        }
                    }

                    user.PortfolioValue = totalValue;

                    var today = DateTime.UtcNow.Date;

                    var existing = await db.UserPortfolioValue
                        .FirstOrDefaultAsync(pv => pv.UserId == user.ID && pv.Date == today);

                    if (existing == null)
                    {
                        db.UserPortfolioValue.Add(new UserPortfolioValue
                        {
                            UserId = user.ID,
                            Date = today,
                            Open = totalValue,
                            High = totalValue,
                            Low = totalValue,
                            Close = totalValue
                        });
                    }
                    else
                    {
                        existing.Close = totalValue;
                        if (totalValue > existing.High) existing.High = totalValue;
                        if (totalValue < existing.Low) existing.Low = totalValue;
                    }

                    _logger.LogInformation($"[Valuator] User {user.ID} portfolio updated: ${totalValue:N2}");
                }

                await db.SaveChangesAsync();

                _logger.LogInformation("[Valuator] All user portfolios updated at {Time}", DateTime.UtcNow);

                await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
            }
        }
    }
}
