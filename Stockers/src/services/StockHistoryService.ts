export class StockItem {
  date!: Date;
  open!: number;
  high!: number;
  low!: number;
  close!: number;
  volume!: number;
}

export async function getInfragisticsStock(symbol: 'Google' | 'Amazon' | 'Tesla' | 'Microsoft'): Promise<StockItem[]> {
  const url = `https://static.infragistics.com/xplatform/data/stocks/stock${symbol}.json`;
  const res = await fetch(url);
  const raw = await res.json();

  return raw.map((item: any) => {
    const [year, month, day] = item.date.split('-').map(Number);
    return {
      date: new Date(year, month - 1, day),
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume
    };
  });
}
