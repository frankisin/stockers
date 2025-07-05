public class YahooFinanceService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public YahooFinanceService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task<string> SearchAsync(string query)
    {
        var apiKey = _config["YahooFinance:ApiKey"];
        var baseUrl = _config["YahooFinance:BaseUrl"];

        var request = new HttpRequestMessage(
            HttpMethod.Get,
            $"{baseUrl}/autocomplete?query={Uri.EscapeDataString(query)}"
        );
        request.Headers.Add("x-api-key", apiKey);

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }
}
