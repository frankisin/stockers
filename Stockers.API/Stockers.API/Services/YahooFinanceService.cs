using System.Text.Json;

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

    public async Task<decimal?> GetQuoteAsync(string symbol)
    {
        var apiKey = _config["YahooFinance:ApiKey"];
        var baseUrl = _config["YahooFinance:BaseUrl"];

        var request = new HttpRequestMessage(
            HttpMethod.Get,
            $"{baseUrl}/quote?symbols={Uri.EscapeDataString(symbol)}"
        );
        request.Headers.Add("x-api-key", apiKey);

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();

        using var doc = JsonDocument.Parse(content);
        var root = doc.RootElement;

        var resultArray = root
            .GetProperty("quoteResponse")
            .GetProperty("result");

        if (resultArray.GetArrayLength() == 0)
            return null;

        var quote = resultArray[0];
        if (quote.TryGetProperty("regularMarketPrice", out var priceElement))
        {
            return priceElement.GetDecimal();
        }

        return null;
    }
}
