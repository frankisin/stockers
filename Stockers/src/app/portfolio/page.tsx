import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'; // ← import this
import Layout from './layout';
import Box from '@mui/material/Box';

import { Summary } from '../../components/portfolio/overview/Summary';
import BrushChart from '../../components/portfolio/overview/BrushChart';

export default function Portfolio(): React.JSX.Element {
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid container spacing={3}>
          <Grid
            size={{
              lg: 4,
              sm: 12,
              xs: 12,
            }}
          >
            <Summary />
          </Grid>
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <BrushChart width={720} height={350} /> {/* 👈 Adjust width manually */}
            </Paper>



          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
