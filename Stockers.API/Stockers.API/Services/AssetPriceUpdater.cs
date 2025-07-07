using Microsoft.EntityFrameworkCore;
using Stockers.API.Helpers;

public class AssetPriceUpdater : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<AssetPriceUpdater> _logger;
    private readonly YahooFinanceService _yahooService;

    public AssetPriceUpdater(IServiceScopeFactory scopeFactory, ILogger<AssetPriceUpdater> logger, YahooFinanceService yahooService)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
        _yahooService = yahooService;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<DataContext>();
                var assets = await db.Assets.ToListAsync();

                foreach (var asset in assets)
                {
                    try
                    {
                        var price = await _yahooService.GetQuoteAsync(asset.Symbol);

                        if (price.HasValue)
                        {
                            asset.LatestPrice = price.Value;
                            asset.LastUpdated = DateTime.UtcNow;
                        }
                        else
                        {
                            _logger.LogWarning($"No price found for {asset.Symbol}");
                        }

                    }
                    catch (Exception ex)
                    {
                        _logger.LogError($"Failed to update {asset.Symbol}: {ex.Message}");
                    }
                }

                await db.SaveChangesAsync();
            }

            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken); // Wait 1 min before next run
        }
    }
}
