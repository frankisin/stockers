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
        [HttpGet("history/{symbol}")]
        public async Task<IActionResult> GetPriceHistory(string symbol)
        {
            var asset = await _context.Assets.FirstOrDefaultAsync(a => a.Symbol == symbol);
            if (asset == null)
                return NotFound("Asset not found");

            var history = await _context.AssetPriceHistory
                .Where(h => h.AssetId == asset.Id)
                .OrderByDescending(h => h.Timestamp)
                .Take(10) // Limit for performance, e.g., last 10 records
                .OrderBy(h => h.Timestamp) // Reorder chronologically
                .ToListAsync();

            return Ok(history.Select(h => new {
                h.Timestamp,
                Price = Math.Round(h.Price, 2)
            }));
        }

    }

}

