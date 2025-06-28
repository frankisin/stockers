'use client';

import * as React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { NavItemConfig } from '../../../types/nav';
import { navItems } from './config';
import { paths } from '../../../paths';
import { isNavItemActive } from '../../../lib/is-nav-item-active';
import { navIcons } from './nav-icons';

export interface SecondarySideNavProps {
  open?: boolean;
  onClose?: () => void;
}

export function SecondarySideNav({ open, onClose }: SecondarySideNavProps): React.JSX.Element {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          '--SideNav-background': 'var(--mui-palette-neutral-950)',
          '--SideNav-color': 'var(--mui-palette-common-white)',
          '--NavItem-color': 'var(--mui-palette-neutral-300)',
          '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
          '--NavItem-active-background': 'var(--mui-palette-primary-main)',
          '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
          '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
          '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
          '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
          '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
          bgcolor: 'var(--SideNav-background)',
          color: 'var(--SideNav-color)',
          width: 280,
        },
      }}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box
          onClick={() => {
            window.location.href = paths.home;
            onClose?.();
          }}
          sx={{ display: 'inline-flex', alignItems: 'baseline', cursor: 'pointer' }}
        >
          <Typography color="inherit" variant="h5" sx={{ fontWeight: 700 }}>
            Stockers
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />

      <Box component="nav">
        {renderNavItems({ pathname, items: navItems, onClose })}
      </Box>

      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)', mt: 'auto' }} />
    </Drawer>
  );
}

function renderNavItems({
  items = [],
  pathname,
  onClose,
}: {
  items?: NavItemConfig[];
  pathname: string;
  onClose?: () => void;
}): React.JSX.Element {
  const children = items.map(({ key, ...item }) => (
    <NavItem key={key} pathname={pathname} onClose={onClose} {...item} />
  ));

  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  pathname: string;
  onClose?: () => void;
}

function NavItem({
  disabled,
  external,
  href,
  icon,
  matcher,
  pathname,
  title,
  onClose,
}: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null;

  const handleClick = () => {
    onClose?.();
  };

  const linkProps = external
    ? { href, target: '_blank', rel: 'noreferrer' }
    : { to: href, component: RouterLink };

  return (
    <li>
      <Box
        {...(href ? linkProps : { role: 'button' })}
        onClick={handleClick}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--NavItem-color)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          gap: 1,
          p: '6px 16px',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            color: 'var(--NavItem-disabled-color)',
          }),
          ...(active && {
            bgcolor: 'var(--NavItem-active-background)',
            color: 'var(--NavItem-active-color)',
          }),
        }}
      >
        {Icon && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon
              fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
              fontSize="var(--icon-fontSize-md)"
              weight={active ? 'fill' : undefined}
            />
          </Box>
        )}
        <Box sx={{ flex: 1 }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </li>
  );
}
