'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { Link } from 'react-router-dom';
import '../../Navbar.css';

import { usePopover } from '../../../hooks/use-popover';
import { SecondarySideNav } from './secondary-side-nav';
import { UserPopover } from './user-popover';


export function SecondaryNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const userPopover = usePopover<HTMLDivElement>();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '64px',
            px: 2,
          }}
        >
          {/* Left side: Logo + mobile toggle + search + portfolio */}
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            {/* Mobile Menu Toggle */}
            <IconButton
              onClick={() => setOpenNav(true)}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>

            {/* Logo */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                cursor: 'pointer',
                display: { xs: 'none', sm: 'block' },
              }}
              onClick={() => (window.location.href = '/')}
            >
              Stockers
            </Typography>

            {/* Search Icon */}
            <Tooltip title="Search">
              <IconButton>
                <MagnifyingGlassIcon />
              </IconButton>
            </Tooltip>

            {/* Portfolio Link */}
            <Box
              onClick={() => (window.location.href = '/portfolio')}
              sx={{
                cursor: 'pointer',
                px: 2,
                py: 1,
                borderRadius: 1,
                fontWeight: 600,
                fontSize: '1rem',
                color: 'text.primary',
                bgcolor: 'transparent',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Portfolio
            </Box>
          </Stack>

          {/* Right side: User tools + Auth links */}
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            {/* Auth links (hide on mobile) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button component={Link} to="/login" variant="text">
                Log In
              </Button>
              <Button component={Link} to="/register" variant="contained">
                Register
              </Button>
            </Box>

            {/* Icons */}
            <Tooltip title="Contacts">
              <IconButton>
                <UsersIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <Badge badgeContent={4} color="success" variant="dot">
                <IconButton>
                  <BellIcon />
                </IconButton>
              </Badge>
            </Tooltip>

            {/* Avatar */}
            <Avatar
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              src="/assets/avatar.png"
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Popovers & Mobile Nav */}
      <UserPopover
        anchorEl={userPopover.anchorRef.current}
        onClose={userPopover.handleClose}
        open={userPopover.open}
      />
      <SecondarySideNav open={openNav} onClose={() => setOpenNav(false)} />


    </React.Fragment>
  );
}
