using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Stockers.API.Helpers
{
    public class ServiceViewResult<T>
    {
        public T Data { get; set; }
        public List<string> ValidationErrors { get; set; } = new();
        public List<ResponseNotification> Notifications { get; set; } = new();

        public bool HasErrors => ValidationErrors.Any();

        public bool Success { get; set; } = true;

        public string Message { get; set; } = string.Empty;

        public void AddModelErrors(ModelStateDictionary modelState)
        {
            foreach (var err in ValidationErrors)
            {
                modelState.AddModelError(string.Empty, err);
            }
        }
    }
}
