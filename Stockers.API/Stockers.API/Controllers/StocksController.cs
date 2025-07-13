using Stockers.API.Helpers;
using Stockers.API.Models;
using Stockers.API.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Stockers.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StocksController : ControllerBase
    {
        private readonly YahooFinanceService _yahooService;
        private readonly DataContext _context;

        public StocksController(YahooFinanceService yahooService, DataContext context)
        {
            _yahooService = yahooService;
            _context = context;
        }

        [HttpGet("search")]

        public async Task<IActionResult> Search(string q)
        {
            if (string.IsNullOrWhiteSpace(q))
                return BadRequest("Query is required");

            try
            {
                var result = await _yahooService.SearchAsync(q);
                return Content(result, "application/json");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Failed to fetch stock data");
            }
        }

        [HttpGet("supported")]
        public async Task<IActionResult> GetSupportedAssets()
        {
            try
            {
                var assets = await _context.Assets
                    .OrderBy(a => a.Symbol)
                    .Select(a => new SupportedAssetViewModel
                    {
                        Symbol = a.Symbol,
                        Name = a.Name,
                        Exchange = a.Exchange
                    })
                    .ToListAsync();

                return Ok(assets);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching supported assets:", ex.Message);
                return StatusCode(500, "Failed to fetch supported assets");
            }
        }

        // GET /api/assets/{symbol}/history?hours=12
        [HttpGet("history")]
        public async Task<IActionResult> GetBatchPriceHistory([FromQuery] string symbols, [FromQuery] string range = "1mo", [FromQuery] string interval = "1d")
        {
            if (string.IsNullOrWhiteSpace(symbols))
                return BadRequest("Symbols query is required");

            try
            {
                var result = new Dictionary<string, List<object>>();
                var symbolList = symbols.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

                foreach (var symbol in symbolList)
                {
                    var chart = await _yahooService.GetChartAsync(symbol, range, interval);
                    var item = chart?.chart?.result?.FirstOrDefault();

                    if (item?.timestamp == null || item.indicators?.quote?.FirstOrDefault() == null)
                        continue;

                    var quote = item.indicators.quote.First();
                    var entries = new List<object>();

                    for (int i = 0; i < item.timestamp.Count; i++)
                    {
                        if (i >= quote.close.Count) continue;

                        entries.Add(new
                        {
                            Timestamp = DateTimeOffset.FromUnixTimeSeconds(item.timestamp[i]).UtcDateTime,
                            Price = Math.Round(quote.close[i] ?? 0, 2)
                        });
                    }

                    result[symbol] = entries;
                }
                return Ok(result);



            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("history/{symbol}")]
        public async Task<IActionResult> GetPriceHistory(string symbol, [FromQuery] string range = "1d", [FromQuery] string interval = "15m")
        {
            if (string.IsNullOrWhiteSpace(symbol))
                return BadRequest("Symbol is required");

            try
            {
                var chartData = await _yahooService.GetChartAsync(symbol, range, interval);

                var item = chartData?.chart?.result?.FirstOrDefault();
                var quote = item?.indicators?.quote?.FirstOrDefault();
                var timestamps = item?.timestamp;

                if (quote == null || timestamps == null)
                    return NotFound($"No data found for symbol: {symbol}");

                var entries = new List<object>();
                for (int i = 0; i < timestamps.Count; i++)
                {
                    if (i >= quote.close.Count) continue;

                    entries.Add(new
                    {
                        Timestamp = DateTimeOffset.FromUnixTimeSeconds(timestamps[i]).UtcDateTime,
                        Price = Math.Round(quote.close[i] ?? 0, 2)
                    });
                }

                return Ok(entries);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching chart for {symbol}: {ex.Message}");
                return StatusCode(500, "Error fetching chart data");
            }
        }

    }

}

