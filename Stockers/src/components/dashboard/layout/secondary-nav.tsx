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

import { useUser } from '../../../hooks/use-user';


export function SecondaryNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const userPopover = usePopover<HTMLDivElement>();
  const { user } = useUser(); // 👈 Grab the user object

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
          {/* Left side */}
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <IconButton onClick={() => setOpenNav(true)} sx={{ display: { lg: 'none' } }}>
              <ListIcon />
            </IconButton>

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

            <Tooltip title="Search">
              <IconButton>
                <MagnifyingGlassIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Right side */}
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            {user ? (
              // Logged-in view: show notifications + avatar
              <>
                <Button
                  component={Link}
                  to="/portfolio"
                  variant="outlined"
                  sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                >
                  My Portfolio
                </Button>
                <Tooltip title="Notifications">
                  <Badge badgeContent={4} color="success" variant="dot">
                    <IconButton>
                      <BellIcon />
                    </IconButton>
                  </Badge>
                </Tooltip>

                <Avatar
                  onClick={userPopover.handleOpen}
                  ref={userPopover.anchorRef}
                  src="/assets/avatar.png"
                  sx={{ cursor: 'pointer' }}
                />
              </>
            ) : (
              // Not logged in: show login/register buttons
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                <Button component={Link} to="/login" variant="text">
                  Log In
                </Button>
                <Button component={Link} to="/register" variant="contained">
                  Register
                </Button>
              </Box>
            )}
          </Stack>
        </Stack>
      </Box>

      {/* Popover + Mobile Nav */}
      <UserPopover
        anchorEl={userPopover.anchorRef.current}
        onClose={userPopover.handleClose}
        open={userPopover.open}
      />
      <SecondarySideNav open={openNav} onClose={() => setOpenNav(false)} />
    </React.Fragment>
  );
}

