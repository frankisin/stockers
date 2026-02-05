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
import { UserContext, useUserContext } from '../../contexts/user-context';
import { WalletService } from '../../services/WalletServices';
import { RecentTransactions } from '../../components/dashboard/overview/recent-transactions';
import { PortfolioAllocation } from '../../components/dashboard/overview/portfolio-composition';

export default function Portfolio(): React.JSX.Element {
  const [supportedAssets, setSupportedAssets] = useState<SupportedAsset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [walletAssets, setWalletAssets] = useState<UserAsset[]>([]);

  const [loading, setLoading] = useState(true);

  const context = useContext(UserContext);
  if (!context) throw new Error('UserContext must be used within a UserProvider');
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
    try {
      const [assets, txns, wallet] = await Promise.all([
        WalletService.getSupportedAssets(),
        WalletService.getUserTransactions(Number(user.ID), 10),
        WalletService.getUserWalletComp(Number(user.ID)),

      ]);
      setSupportedAssets(assets);
      setTransactions(txns);
      setWalletAssets(Array.isArray(wallet) ? wallet : []);
      

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
          {/* Summary + Wallet */}
          <Grid size={{ lg: 4, sm: 12, xs: 12 }}>
            <Summary />
            <Wallet />
          </Grid>

          {/* Chart */}
          {user && (
            <Grid size={{ lg: 8, sm: 12, xs: 12 }}>
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
          <Grid size={{ lg: 8, md: 6, xs: 12 }}>
            <RecentTransactions transactions={transactions} />
          </Grid>

          {/* Portfolio Allocation */}
          <Grid size={{ lg: 4, md: 6, xs: 12 }}>
            <PortfolioAllocation
              assets={walletAssets
                .filter((item) => item.asset != null)
                .map((item) => ({
                  assetSymbol: item.asset.symbol,
                  quantity: item.quantity,
                  latestPrice: item.asset.latestPrice ?? 0,
                }))}
            />

          </Grid>


          {/* Market News */}
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
interface UserAsset {
  id: number;
  assetId: number;
  userId: number;
  quantity: number;
  avgPurchasePrice: number;
  createdAt: string;
  asset: {
    id: number;
    symbol: string;
    name: string;
    latestPrice: number;
  } | null;
}
