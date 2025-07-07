using Microsoft.EntityFrameworkCore;
using Stockers.API.Helpers;
using Stockers.API.Models;

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

                // Batch assets into groups of 10 (Yahoo limit)
                var batchedAssets = assets
                    .Select((a, i) => new { Asset = a, Index = i })
                    .GroupBy(x => x.Index / 10)
                    .Select(g => g.Select(x => x.Asset).ToList())
                    .ToList();

                foreach (var group in batchedAssets)
                {
                    var symbols = string.Join(",", group.Select(a => a.Symbol));

                    try
                    {
                        var quotes = await _yahooService.GetBatchQuotesAsync(symbols);

                        foreach (var asset in group)
                        {
                            if (quotes.TryGetValue(asset.Symbol, out var price) && price.HasValue)
                            {
                                asset.LatestPrice = price.Value;
                                asset.LastUpdated = DateTime.UtcNow;

                                db.AssetPriceHistory.Add(new AssetPriceHistory
                                {
                                    AssetId = asset.Id,
                                    Price = price.Value,
                                    Timestamp = DateTime.UtcNow
                                });
                            }
                            else
                            {
                                _logger.LogWarning($"No price found for {asset.Symbol}");
                            }
                        }

                        // Optional: Delay between batches to avoid throttling
                        await Task.Delay(200, stoppingToken);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError($"Batch failed for symbols: {symbols} => {ex.Message}");
                    }
                }

                await db.SaveChangesAsync();
            }

            await Task.Delay(TimeSpan.FromMinutes(60), stoppingToken);
        }
    }
}
