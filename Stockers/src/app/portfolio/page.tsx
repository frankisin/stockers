'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Layout from './layout';

import { Summary } from '../../components/portfolio/overview/Summary';

import PortfolioChart from '../../components/portfolio/overview/PortfolioChart';
import { Wallet } from '../../components/portfolio/overview/Wallet';
import { PortfolioNews } from '../../components/portfolio/overview/PortfolioNews';
import dayjs from 'dayjs';
import { LatestOrders } from '../../components/dashboard/overview/latest-orders';
import { Traffic } from '../../components/dashboard/overview/traffic';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user-context';
import { WalletService } from '../../services/WalletServices';

export default function Portfolio(): React.JSX.Element {

  const [supportedAssets, setSupportedAssets] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const context = useContext(UserContext);
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { user } = context;

    useEffect(() => {
    if (!user) return;

    const fetchWallet = async () => {
      try {
        const data = await WalletService.getSupportedAssets();
        console.log(data);
        setSupportedAssets(data);
      } catch (err) {
        console.error('Error fetching wallet:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, [user]);
  
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

          {user && ( <Grid
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
                <PortfolioChart userId={user.id} walletService={WalletService} />
              </Box>
            </Paper>


          </Grid>)/* BrushChart inside scrollable Paper */}
         
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
