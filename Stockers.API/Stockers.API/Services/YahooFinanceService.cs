using System.Text.Json;
using Stockers.API.Models;

public class YahooFinanceService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _baseUrl;

    public YahooFinanceService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _apiKey = config["YahooFinance:ApiKey"];
        _baseUrl = config["YahooFinance:BaseUrl"];
    }

    private HttpRequestMessage CreateRequest(HttpMethod method, string relativeUrl)
    {
        var request = new HttpRequestMessage(method, $"{_baseUrl}{relativeUrl}");
        request.Headers.Add("x-api-key", _apiKey);
        request.Headers.Add("accept", "application/json");
        return request;
    }

    public async Task<string> SearchAsync(string query)
    {
        var request = CreateRequest(HttpMethod.Get, $"/v6/finance/autocomplete?query={Uri.EscapeDataString(query)}");
        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }

    public async Task<decimal?> GetQuoteAsync(string symbol)
    {
        var request = CreateRequest(HttpMethod.Get, $"/v6/finance/quote?symbols={Uri.EscapeDataString(symbol)}");
        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();

        using var doc = JsonDocument.Parse(content);
        var resultArray = doc.RootElement.GetProperty("quoteResponse").GetProperty("result");

        if (resultArray.GetArrayLength() == 0) return null;

        var quote = resultArray[0];
        if (quote.TryGetProperty("regularMarketPrice", out var priceElement))
        {
            return priceElement.GetDecimal();
        }

        return null;
    }

    public async Task<Dictionary<string, decimal?>> GetBatchQuotesAsync(string symbolsCsv)
    {
        var request = CreateRequest(HttpMethod.Get, $"/v6/finance/quote?symbols={Uri.EscapeDataString(symbolsCsv)}");
        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();

        using var doc = JsonDocument.Parse(content);
        var results = doc.RootElement.GetProperty("quoteResponse").GetProperty("result");

        var quoteMap = new Dictionary<string, decimal?>();

        foreach (var quote in results.EnumerateArray())
        {
            var symbol = quote.GetProperty("symbol").GetString();
            decimal? price = quote.TryGetProperty("regularMarketPrice", out var priceElem) &&
                            priceElem.TryGetDecimal(out var parsedPrice)
                            ? parsedPrice
                            : null;

            if (!string.IsNullOrEmpty(symbol))
            {
                quoteMap[symbol] = price;
            }
        }

        return quoteMap;
    }

    public async Task<YahooChartResponse?> GetChartBatchAsync(string symbolsCsv, string range = "1mo", string interval = "1d")
    {
        var request = CreateRequest(HttpMethod.Get, $"/v8/finance/spark?symbols={Uri.EscapeDataString(symbolsCsv)}&range={range}&interval={interval}");

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();

        return JsonSerializer.Deserialize<YahooChartResponse>(content, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
    }

    public async Task<List<AssetPriceHistory>> GetOhlcHistoryAsync(string symbol, int days = 30)
{
    var url = $"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?range={days}d&interval=1d";

    using var client = new HttpClient();
    var response = await client.GetAsync(url);
    if (!response.IsSuccessStatusCode) return new List<AssetPriceHistory>();

    var json = await response.Content.ReadAsStringAsync();
    var doc = JsonDocument.Parse(json);

    var chart = doc.RootElement.GetProperty("chart").GetProperty("result")[0];

    var timestamps = chart.GetProperty("timestamp").EnumerateArray().ToArray();
    var quote = chart.GetProperty("indicators").GetProperty("quote")[0];

    var opens = quote.GetProperty("open").EnumerateArray().ToArray();
    var highs = quote.GetProperty("high").EnumerateArray().ToArray();
    var lows = quote.GetProperty("low").EnumerateArray().ToArray();
    var closes = quote.GetProperty("close").EnumerateArray().ToArray();
    var volumes = quote.GetProperty("volume").EnumerateArray().ToArray();

    var history = new List<AssetPriceHistory>();

    for (int i = 0; i < timestamps.Length; i++)
    {
        if (opens[i].ValueKind == JsonValueKind.Null || closes[i].ValueKind == JsonValueKind.Null)
            continue;

        var date = DateTimeOffset.FromUnixTimeSeconds(timestamps[i].GetInt64()).UtcDateTime.Date;

        history.Add(new AssetPriceHistory
        {
            Date = date,
            Open = opens[i].GetDecimal(),
            High = highs[i].GetDecimal(),
            Low = lows[i].GetDecimal(),
            Close = closes[i].GetDecimal(),
            Volume = volumes[i].ValueKind != JsonValueKind.Null ? volumes[i].GetInt64() : (long?)null
        });
    }

    return history;
}

}
