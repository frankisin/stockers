import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import { paths } from '../../paths';
import { logger } from '../../lib/default-logger';
import { useUser } from '../../hooks/use-user';

export interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard = ({ children }: GuestGuardProps): React.JSX.Element | null => {
  const navigate = useNavigate();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkPermissions = async () => {
      if (isLoading) return;

      if (error) {
        setIsChecking(false);
        return;
      }

      /*
      if (user) {
        logger.debug('[GuestGuard]: User is logged in, redirecting to dashboard');
        navigate(paths.dashboard.overview, { replace: true });
        return;
      }
      */
      setIsChecking(false);
    };

    checkPermissions().catch(() => {});
  }, [user, error, isLoading, navigate]);

  if (isChecking) return null;

  if (error) return <Alert severity="error">{error}</Alert>;

  return <>{children}</>;
};

export default GuestGuard;
