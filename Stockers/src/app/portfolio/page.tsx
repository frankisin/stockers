'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Layout from './layout';

import { Summary } from '../../components/portfolio/overview/Summary';
import BrushChart from '../../components/portfolio/overview/BrushChart';
import { Wallet } from '../../components/portfolio/overview/Wallet';
import { PortfolioNews } from '../../components/portfolio/overview/PortfolioNews';
import dayjs from 'dayjs';
import { LatestOrders } from '../../components/dashboard/overview/latest-orders';
import { Traffic } from '../../components/dashboard/overview/traffic';


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
            <Wallet />
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
                <BrushChart width={1200} height={510} margin={{ top: 0, left: 50, bottom: 20, right: 20 }} />
              </Box>
            </Paper>


          </Grid>


          <Grid
            size={{
              lg: 8,
              md: 6,
              xs: 12,
            }}
          >

            <LatestOrders
              orders={[
                {
                  id: 'ORD-007',
                  customer: { name: 'Ekaterina Tankova' },
                  amount: 30.5,
                  status: 'pending',
                  createdAt: dayjs().subtract(10, 'minutes').toDate(),
                },
                {
                  id: 'ORD-006',
                  customer: { name: 'Cao Yu' },
                  amount: 25.1,
                  status: 'delivered',
                  createdAt: dayjs().subtract(10, 'minutes').toDate(),
                },
                {
                  id: 'ORD-004',
                  customer: { name: 'Alexa Richardson' },
                  amount: 10.99,
                  status: 'refunded',
                  createdAt: dayjs().subtract(10, 'minutes').toDate(),
                },
                {
                  id: 'ORD-003',
                  customer: { name: 'Anje Keizer' },
                  amount: 96.43,
                  status: 'pending',
                  createdAt: dayjs().subtract(10, 'minutes').toDate(),
                },
                {
                  id: 'ORD-002',
                  customer: { name: 'Clarke Gillebert' },
                  amount: 32.54,
                  status: 'delivered',
                  createdAt: dayjs().subtract(10, 'minutes').toDate(),
                },
                {
                  id: 'ORD-001',
                  customer: { name: 'Adam Denisov' },
                  amount: 16.76,
                  status: 'delivered',
                  createdAt: dayjs().subtract(10, 'minutes').toDate(),
                },
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            size={{
              lg: 4,
              sm: 12,
              xs: 12,
            }}
          >
            <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
          </Grid>
          <PortfolioNews />

        </Grid>
      </Grid>
    </Layout>
  );
}
