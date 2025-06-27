'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
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
        <Typography variant="subtitle2" color="text.secondary">
          As of June 27, 2025
        </Typography>
      </CardContent>
    </Card>
  );
}
