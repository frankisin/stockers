using Microsoft.EntityFrameworkCore;
using Stockers.API.Helpers;
using Stockers.API.Models;

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
                    var asset = ua.Asset;
                    if (asset != null)
                    {
                        totalValue += ua.Quantity * asset.LatestPrice;
                    }

                }

                // Update current value
                user.PortfolioValue = totalValue;

                // Add new history row
                db.UserPortfolioValue.Add(new UserPortfolioValue
                {
                    UserId = user.ID,
                    TotalValue = totalValue,
                    Timestamp = DateTime.UtcNow
                });

                _logger.LogInformation($"User {user.ID} portfolio: ${totalValue:N2}");
            }

            await db.SaveChangesAsync();

            // Run every hour
            await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
        }
    }
}
