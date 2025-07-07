'use client';

import * as React from 'react';
import { useUserContext } from '../../../contexts/user-context';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export interface SummaryProps {
  sx?: SxProps;
}

export function Summary({ sx }: SummaryProps): React.JSX.Element {
  const { user } = useUserContext();
  const balance: number = Number(user?.userBalance ?? 0);

  console.log('User from context:', user);


  return (
    <Card sx={sx}>
      <CardHeader
        title="Portfolio Summary"
        slotProps={{
          title: {
            sx: {
              fontSize: '26px',
              fontWeight: '450',
              fontFamily: 'Inter, sans-serif',
              color: 'text.primary',
            },
          },
        }}
      />
      <CardContent>
        <Typography variant="h4" color="text.primary">
          ${balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          As of July 7, 2025
        </Typography>

        <Card
          elevation={0}
          sx={{
            mt: 0,
            p: 2,
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <InsertChartIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">Monthly</Typography>
            </Box>
            <Typography variant="body2" color="text.primary">$451.64</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <WbSunnyIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">Daily</Typography>
            </Box>
            <Typography variant="body2" color="text.primary">$14.85</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <TrendingUpIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">Yield</Typography>
            </Box>
            <Typography variant="body2" color="text.primary">3.38%</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <HourglassEmptyIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">Yet to receive</Typography>
            </Box>
            <Typography variant="body2" color="text.primary">$291.77</Typography>
          </Box>
        </Card>
      </CardContent>
    </Card>
  );
}
