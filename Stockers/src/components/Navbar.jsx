'use client';

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
//Projects/Stockers/stockers/Stockers/src/components/dashboard/layout/user-popover"
import { usePopover } from '@/hooks/use-popover';
import { UserPopover } from '../../src/components/dashboard/layout/user-popover';

function Navbar() {
  const userPopover = usePopover();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
        <div className="container px-5">
          <a className="navbar-brand" href="/home">Stockers</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="/register">Register</a></li>
              <li className="nav-item"><a className="nav-link" href="/login">Log In</a></li>
            </ul>

            {/* RIGHT SIDE ICONS */}
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', ml: 2 }}>
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
              <Avatar
                onClick={userPopover.handleOpen}
                ref={userPopover.anchorRef}
                src="/assets/avatar.png"
                sx={{ cursor: 'pointer' }}
              />
            </Stack>
          </div>
        </div>
      </nav>

      <UserPopover
        anchorEl={userPopover.anchorRef.current}
        onClose={userPopover.handleClose}
        open={userPopover.open}
      />
    </header>
  );
}

export default Navbar;
