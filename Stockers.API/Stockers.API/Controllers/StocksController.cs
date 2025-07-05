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
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class StocksController : ControllerBase
    {
        private readonly YahooFinanceService _yahooService;

        public StocksController(YahooFinanceService yahooService)
        {
            _yahooService = yahooService;
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
    }
}

