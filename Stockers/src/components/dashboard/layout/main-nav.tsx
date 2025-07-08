'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Link from 'next/link';
import { useUserContext } from '../../../contexts/user-context';

import { BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import { usePopover } from '../../../hooks/use-popover';
import { MobileNav } from './mobile-nav';
import { UserPopover } from './user-popover';

export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const userPopover = usePopover<HTMLDivElement>();
  const { user } = useUserContext();
  const balance = typeof user?.userBalance === 'number' ? user.userBalance : 0;

  return (
    <>
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
          alignItems="center"
          sx={{
            position: 'relative',
            justifyContent: 'space-between',
            minHeight: '64px',
            px: 2,
          }}
        >
          {/* LEFT SIDE */}
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              onClick={() => setOpenNav(true)}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
            <Tooltip title="Search">
              <IconButton>
                <MagnifyingGlassIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* CENTER - WALLET */}
          {user?.ID ? (
            <Box
              onClick={() => (window.location.href = '/account')}
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                px: 2,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': {
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <WalletIcon fontSize="small" color="action" />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: 'text.primary', minWidth: '80px' }}
                >
                  ${Number(balance).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Stack>
            </Box>
          ) : null}


          {/* RIGHT SIDE */}
          <Stack direction="row" spacing={2} alignItems="center">
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
          </Stack>
        </Stack>

      </Box>

      <UserPopover
        anchorEl={userPopover.anchorRef.current}
        onClose={userPopover.handleClose}
        open={userPopover.open}
      />

      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </>
  );
}
