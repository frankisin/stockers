import React, { useEffect, useState } from 'react';
import { IgrFinancialChartModule, IgrFinancialChart } from 'igniteui-react-charts';
import { IgrLegendModule } from 'igniteui-react-charts';
import { IgrDataChartInteractivityModule } from 'igniteui-react-charts';
import { IgrDataChartCategoryModule } from 'igniteui-react-charts';

import '@igniteui/material-icons-extended';
import { getInfragisticsStock, StockItem } from '../../../services/StockHistoryService';

// Register only valid modules
IgrFinancialChartModule.register();
IgrLegendModule.register();
IgrDataChartInteractivityModule.register();
IgrDataChartCategoryModule.register();

interface PortfolioPoint {
  value: number;
  date: string;
}

interface PortfolioChartProps {
  userId?: string;
  walletService?: any;
  height?: string;
}

export default function PortfolioChart({ userId, walletService, height = '500px' }: PortfolioChartProps) {
  const [data, setData] = useState<PortfolioPoint[]>([]);
  const [history, setHistory] = useState<StockItem[]>([]);

  useEffect(() => {
    async function fetchPortfolioHistory() {
      try {
        getInfragisticsStock('Google').then(setHistory);
        /*
        const res = await walletService.getUserPortfolioHistory(userId);
        const formatted = res.map((row: any) => ({
          date: new Date(row.timestamp).toISOString(),
          value: row.value,
        }));
        setData(formatted);
        */
      } catch (err) {
        console.error('Failed to load portfolio history', err);
      }
    }

    fetchPortfolioHistory();
  }, [userId]);

  return (
    <div style={{ height, width: '100%' }}>
      <IgrFinancialChart
        width="100%"
        height="100%"
        chartType="Line"
        yAxisMode="PercentChange"
        xAxisMode="Time"
        thickness={2}
        dataSource={history}
        chartTitle="Portfolio Value Over Time"
        subtitle="Based on historical portfolio snapshots"
      />
    </div>
  );
}
