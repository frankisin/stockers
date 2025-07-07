using Microsoft.AspNetCore.Mvc;
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

        public WalletController(IWalletService walletService, ILogger<WalletController> logger)
        {
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

    }
}
