import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '../../paths';
import { DynamicLogo } from '../../components/core/logo';
import Navbar from '../Navbar';
import { SecondaryNav } from '../dashboard/layout/secondary-nav';
import '../../styles/theme/components/circles.css';

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): React.JSX.Element => {
  return (
    <div>
      <SecondaryNav />
      <Box
        sx={{
          display: { xs: 'flex', lg: 'grid' },
          flexDirection: 'column',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '100vh',
        }}
      >


        {/* Left Side: Form Panel */}
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>

          <Box sx={{ p: 3 }}>
            <Box
              component={Link}
              to={paths.home}
              sx={{ display: 'inline-block', fontSize: 0 }}
            >
              <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flex: '1 1 auto',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Box sx={{ maxWidth: '450px', width: '100%' }}>{children}</Box>
          </Box>
        </Box>


        {/* Right Side: Welcome Panel */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            alignItems: 'center',
            background: 'linear-gradient(0deg, #ff6a00 0%, #ee0979 100%)',
            color: 'white',
            display: { xs: 'none', lg: 'flex' },
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Stack spacing={3} sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: 'white',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}
            >
              Welcome to Stockers
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '400px',
                mx: 'auto',
              }}
            >
              You’re entering a dimension of charts, trades, and mind-altering velocity. Buckle up, pilot.
            </Typography>
          </Stack>


          {/* Circle background */}
          <Box className="bg-circle bg-circle-1" />
          <Box className="bg-circle bg-circle-2" />
          <Box className="bg-circle bg-circle-3" />
          <Box className="bg-circle bg-circle-4" />
          <Box className="bg-circle bg-circle-5" />

          {/* Noise overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://www.transparenttextures.com/patterns/asfalt-light.png)',
              opacity: 0.06,
              zIndex: 0.5,
              pointerEvents: 'none',
            }}
          />
        </Box>
      </Box>
    </div>

  );
};

export default Layout;
