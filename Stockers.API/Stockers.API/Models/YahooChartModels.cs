namespace Stockers.API.Models
{
    public class YahooChartResult
    {
        public YahooChartChart chart { get; set; }
    }

    public class YahooChartChart
    {
        public List<YahooChartResultItem> result { get; set; }
    }

    public class YahooChartResultItem
    {
        public YahooMeta meta { get; set; }
        public YahooIndicators indicators { get; set; }
        public List<long> timestamp { get; set; }
    }

    public class YahooMeta
    {
        public string symbol { get; set; }
    }

    public class YahooIndicators
    {
        public List<YahooQuote> quote { get; set; }
    }

    public class YahooQuote
    {
        public List<decimal?> open { get; set; }
        public List<decimal?> high { get; set; }
        public List<decimal?> low { get; set; }
        public List<decimal?> close { get; set; }
        public List<long?> volume { get; set; }
    }
}
