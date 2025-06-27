'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';

export interface SummaryProps {
  sx?: SxProps;
}

export function Summary({ sx }: SummaryProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Portfolio Total" />
      <CardContent>
        <Typography variant="h4" color="text.primary">
          $128,490.32
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          As of June 27, 2025
        </Typography>

        {/* Nested Card */}
        <Card
          elevation={0}
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">📊 Monthly</Typography>
            <Typography variant="body2" color="text.primary">$451.64</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">🌞 Daily</Typography>
            <Typography variant="body2" color="text.primary">$14.85</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">📈 Yield</Typography>
            <Typography variant="body2" color="text.primary">3.38%</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">⏳ Yet to receive</Typography>
            <Typography variant="body2" color="text.primary">$291.77</Typography>
          </Box>
        </Card>
      </CardContent>
    </Card>
  );
}
