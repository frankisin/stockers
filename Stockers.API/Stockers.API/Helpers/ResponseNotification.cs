namespace Stockers.API.Helpers
{
    public class ResponseNotification
    {
        public string Message { get; set; }
        public NotificationType Type { get; set; }
        
    }

public enum NotificationType
{
    Info,
    Success,
    Warning,
    Error
}

}
