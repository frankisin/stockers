namespace Stockers.API.Helpers
{
    public class ViewDataResponse<T>
    {
        public T Data { get; set; }
        public List<ResponseNotification> Notifications { get; set; } = new();

        public ViewDataResponse(T data, List<ResponseNotification> notifications)
        {
            Data = data;
            Notifications = notifications;
        }

        public ViewDataResponse(List<ResponseNotification> notifications)
        {
            Notifications = notifications;
        }
    }
}
