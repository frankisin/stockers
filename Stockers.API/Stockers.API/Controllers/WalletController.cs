using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Stockers.API.Helpers;
using Stockers.API.Models;
using Stockers.API.Services.Interfaces;

namespace Stockers.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WalletController : Controller
    {
        private readonly IWalletService _walletService;
        private readonly ILogger<WalletController> _logger;

        private readonly DataContext _dataContext;

        public WalletController(IWalletService walletService, ILogger<WalletController> logger, DataContext dataContext)
        {
            _dataContext = dataContext;
            _walletService = walletService;
            _logger = logger;
        }

        [HttpPost("buy")]
        public async Task<IActionResult> AddAssetToWallet(AddAssetToWalletModel model)
        {
            ViewDataResponse<AddAssetToWalletModel> response;
            ServiceViewResult<bool> result;
            List<ResponseNotification> notifications = new();

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                result = await _walletService.AddAssetToUserWalletAsync(model);

                if (result.ValidationErrors.Any())
                {
                    result.AddModelErrors(ModelState);
                    return BadRequest(ModelState);
                }

                if (result.Notifications.Any())
                {
                    response = new ViewDataResponse<AddAssetToWalletModel>(model, result.Notifications);
                    return Json(response);
                }

                return Json(result.Data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while adding asset to wallet");

                notifications.Add(new ResponseNotification
                {
                    Type = NotificationType.Error,
                    Message = ViewNotification.genericWebError
                });

                response = new ViewDataResponse<AddAssetToWalletModel>(model, notifications);
                return Json(response);
            }
        }

        [HttpPost("sell")]
        public async Task<IActionResult> SellAsset(SellAssetModel model)
        {
            ViewDataResponse<SellAssetModel> response;
            ServiceViewResult<bool> result;
            List<ResponseNotification> notifications = new();

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                result = await _walletService.SellAssetAsync(model);

                if (result.ValidationErrors.Any())
                {
                    result.AddModelErrors(ModelState);
                    return BadRequest(ModelState);
                }

                if (result.Notifications.Any())
                {
                    response = new ViewDataResponse<SellAssetModel>(model, result.Notifications);
                    return Json(response);
                }

                return Json(result.Data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while selling asset");

                notifications.Add(new ResponseNotification
                {
                    Type = NotificationType.Error,
                    Message = ViewNotification.genericWebError
                });

                response = new ViewDataResponse<SellAssetModel>(model, notifications);
                return Json(response);
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserWallet(int userId)
        {
            try
            {
                var wallet = await _walletService.GetUserWalletAsync(userId);
                return Ok(wallet);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching user wallet");
                return StatusCode(500, "Failed to fetch wallet");
            }
        }
        [HttpGet("portfolio/{userId}")]
        public async Task<IActionResult> GetUserPortfolioValue(int userId)
        {
            try
            {
                var result = await _walletService.GetUserPortfolioValueAsync(userId);

                if (!result.Success)
                {
                    return StatusCode(500, result.Message ?? "Failed to fetch portfolio value");
                }

                return Ok(result.Data); // Sends back just the number (e.g., 11342.00)
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calculating portfolio value");
                return StatusCode(500, "Failed to fetch portfolio value");
            }
        }

        [HttpGet("transactions/{userId}")]
        public async Task<IActionResult> GetRecentTransactions(int userId, [FromQuery] int limit = 10)
        {
            try
            {
                var transactions = await _dataContext.Transactions
                    .Where(t => t.UserId == userId)
                    .OrderByDescending(t => t.Timestamp)
                    .Take(limit)
                    .ToListAsync();

                return Ok(transactions);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching recent transactions");
                return StatusCode(500, "Failed to fetch transactions");
            }
        }



    }
}
