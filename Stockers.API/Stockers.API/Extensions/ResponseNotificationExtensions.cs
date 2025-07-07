namespace Stockers.API.Helpers
{
    public static class ResponseNotificationExtensions
    {
        public static void Add(this List<ResponseNotification> list, NotificationType type, string message)
        {
            list.Add(new ResponseNotification
            {
                Type = type,
                Message = message
            });
        }
    }
}
