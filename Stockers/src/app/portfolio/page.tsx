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
import { Traffic } from '../../components/dashboard/overview/traffic';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user-context';
import { WalletService } from '../../services/WalletServices';
import {RecentTransactions} from '../../components/dashboard/overview/recent-transactions'; // 

export default function Portfolio(): React.JSX.Element {
  const [supportedAssets, setSupportedAssets] = useState<SupportedAsset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const context = useContext(UserContext);
  if (!context) throw new Error('UserContext must be used within a UserProvider');
  const { user } = context;

  useEffect(() => {
    if (!user) return;//rebuild

    const fetchData = async () => {
      try {
        const [assets, txns] = await Promise.all([
          WalletService.getSupportedAssets(),
          WalletService.getUserTransactions(Number(user.id), 10)

        ]);
        setSupportedAssets(assets);
        setTransactions(txns);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid container spacing={3}>
          {/* Summary and Wallet */}
          <Grid item lg={4} sm={12} xs={12}>
            <Summary />
            <Wallet />
          </Grid>

          {/* Portfolio Chart */}
          {user && (
            <Grid item lg={8} sm={12} xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: 'white',
                  height: '100%',
                  overflowX: 'auto',
                }}
              >
                <Box sx={{ minWidth: 600 }}>
                  <PortfolioChart userId={user.id} walletService={WalletService} />
                </Box>
              </Paper>
            </Grid>
          )}

          {/* Recent Transactions */}
          <Grid item lg={8} md={6} xs={12}>
            <RecentTransactions transactions={transactions} />
          </Grid>

          {/* Device Traffic */}
          <Grid item lg={4} sm={12} xs={12}>
            <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
          </Grid>

          {/* News */}
          <PortfolioNews />
        </Grid>
      </Grid>
    </Layout>
  );
}

interface SupportedAsset {
  symbol: string;
  name: string;
}

interface Transaction {
  id: number;
  assetSymbol: string;
  quantity: number;
  pricePerShare: number;
  timestamp: string;
  type: 'buy' | 'sell';
}
