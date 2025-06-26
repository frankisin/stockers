'use client';

import { lazy, Suspense } from 'react';
import { styled } from '@mui/system';

// Lazy load ApexChart
const ApexChart = lazy(() => import('react-apexcharts'));

// Styled wrapper (same as before)
export const Chart = styled((props) => (
  <Suspense fallback={null}>
    <ApexChart {...props} />
  </Suspense>
))``;
