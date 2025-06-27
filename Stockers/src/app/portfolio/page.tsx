'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Layout from './layout';

import { Summary } from '../../components/portfolio/overview/Summary';
import BrushChart from '../../components/portfolio/overview/BrushChart';

export default function Portfolio(): React.JSX.Element {
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid container spacing={3}>
          {/* Summary Card */}
          <Grid
            size={{
              lg: 4,
              sm: 12,
              xs: 12,
            }}
          >
            <Summary />
          </Grid>

          {/* BrushChart inside scrollable Paper */}
          <Grid
            size={{
              lg: 8,
              sm: 12,
              xs: 12,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: 'white',
                height: '100%',
                overflowX: 'auto', // allow horizontal scrolling if content overflows
              }}
            >
              <Box sx={{ minWidth: 600 }}>
                <BrushChart width={1000} height={350} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
