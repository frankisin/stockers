import * as React from 'react';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import Layout from './layout';

import { config } from '../../config';
import { Budget } from '../../components/dashboard/overview/budget';
import { LatestOrders } from '../../components/dashboard/overview/latest-orders';
import { LatestProducts } from '../../components/dashboard/overview/latest-products';
import { Sales } from '../../components/dashboard/overview/sales';
import { TasksProgress } from '../../components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '../../components/dashboard/overview/total-customers';
import { TotalProfit } from '../../components/dashboard/overview/total-profit';
import { Traffic } from '../../components/dashboard/overview/traffic';
import { DividendChart } from '../../components/portfolio/overview/DividendChart';
import { Summary } from '../../components/portfolio/overview/Summary';

export default function Portfolio(): React.JSX.Element {
  return (
    <Layout>
      <Grid container spacing={3}>
                 <Grid
          size={{
            lg: 12,
            sm: 8,
            xs: 8,
          }}
        >
          <Summary/>
        </Grid>
        <Grid
          size={{
            lg: 12,
            sm: 4,
            xs: 4,
          }}
        >
          <DividendChart
            chartSeries={[
              {
                name: 'Declared',
                data: [383, 327, 624, 412, 332, 631, 389, 350, 639, 404, 323, 606],
              },
            ]}
            sx={{ height: '100%' }}
          />
        </Grid>

      </Grid>
    </Layout>

  );
}
