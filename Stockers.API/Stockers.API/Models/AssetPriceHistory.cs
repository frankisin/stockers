namespace Stockers.API.Models
{

    public class AssetPriceHistory
    {
        public int Id { get; set; }

        public int AssetId { get; set; }
        public Assets Asset { get; set; }

        public DateTime Date { get; set; } // UTC Date only

        public decimal Open { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public decimal Close { get; set; }

        public long? Volume { get; set; } // Optional
    }

    public class YahooChartResponse : Dictionary<string, YahooChartData> { }

    public class YahooChartData
    {
        public string Symbol { get; set; }
        public List<long> Timestamp { get; set; } = new();
        public List<decimal> Close { get; set; } = new();

        public int DataGranularity { get; set; }
        public decimal? PreviousClose { get; set; }
        public decimal? ChartPreviousClose { get; set; }
    }

}
