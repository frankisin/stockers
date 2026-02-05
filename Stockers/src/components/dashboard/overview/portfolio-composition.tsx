'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';
import type { SxProps } from '@mui/material/styles';

import { Chart } from '../../../components/core/chart';

export interface PortfolioAllocationProps {
  assets: {
    assetSymbol: string;
    quantity: number;
    latestPrice: number;
  }[];
  sx?: SxProps;
}

export function PortfolioAllocation({
  assets,
  sx,
}: PortfolioAllocationProps): React.JSX.Element {
  const theme = useTheme();

  const chartData = React.useMemo(() => {
    console.log('Assets injected into component: ',assets);
    const totalValue = assets.reduce((sum, a) => sum + a.quantity * a.latestPrice, 0);
    const values = assets.map((a) => parseFloat(((a.quantity * a.latestPrice * 100) / totalValue).toFixed(2)));
    const labels = assets.map((a) => a.assetSymbol);
    return { labels, values };
  }, [assets]);

  const chartOptions: ApexOptions = {
    chart: { background: 'transparent' },
    labels: chartData.labels,
    colors: theme.palette.mode === 'dark'
      ? ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA']
      : ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    dataLabels: { enabled: false },
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };

  return (
    <Card sx={sx}>
      <CardHeader title="Portfolio Allocation" />
      <CardContent>
        <Stack spacing={2}>
          <Chart
            height={300}
            options={chartOptions}
            series={chartData.values}
            type="donut"
            width="100%"
          />
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            {chartData.labels.map((label, index) => (
              <Stack key={label} spacing={0.5} sx={{ alignItems: 'center', minWidth: 80 }}>
                <Typography variant="h6">{label}</Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {chartData.values[index]}%
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
