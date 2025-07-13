import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

export interface Transaction {
  Id: number;
  AssetSymbol: string;
  Quantity: number;
  PricePerShare: number;
  Timestamp: string;
  Type: 'buy' | 'sell';
}

export interface LatestOrdersProps {
  transactions?: Transaction[];
  sx?: SxProps;
}

export function RecentTransactions({ transactions = [], sx }: LatestOrdersProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Latest orders" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price/Share</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>

          <TableBody>
          {transactions.map((tx) => (
            <TableRow hover key={tx.Id}>
              <TableCell>{tx.AssetSymbol}</TableCell>
              <TableCell>{tx.Type === 'buy' ? 'Purchase' : 'Sale'}</TableCell>
              <TableCell>{tx.Quantity}</TableCell>
              <TableCell>
                {typeof tx.PricePerShare === 'number'
                  ? `$${tx.PricePerShare.toFixed(2)}`
                  : 'N/A'}
              </TableCell>
              <TableCell>{dayjs(tx.Timestamp).format('MMM D, YYYY')}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
