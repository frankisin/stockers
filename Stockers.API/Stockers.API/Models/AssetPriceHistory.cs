namespace Stockers.API.Models
{
    public class AssetPriceHistory
    {
        public int Id { get; set; }

        public int AssetId { get; set; }
        public Assets Asset { get; set; }

        public decimal Price { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
    public class YahooChartResponse : Dictionary<string, YahooChartData> { }

    public class YahooChartData
    {
        public string Symbol { get; set; }
        public List<long> Timestamp { get; set; }
        public List<decimal> Close { get; set; }
        public int DataGranularity { get; set; }
        public decimal? PreviousClose { get; set; }
        public decimal? ChartPreviousClose { get; set; }
    }
}
