'use client';

import React, { useEffect, useCallback, useState } from 'react';

import type { User } from '../types/user';
import { authClient } from '../lib/auth/client';
import { logger } from '../lib/default-logger';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
  setUser?: (user: User | null) => void;
  signOut?: () => void;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = useState<{
    user: User | null;
    error: string | null;
    isLoading: boolean;
  }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = useCallback(async (): Promise<void> => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Not signed in, but not an error
    setState((prev) => ({ ...prev, user: null, error: null, isLoading: false }));
    return;
  }

  try {
    const { data, error } = await authClient.getUser();

    if (error || !data) {
      logger.warn('Token is present but user session could not be loaded');
      setState((prev) => ({ ...prev, user: null, error: null, isLoading: false }));
      return;
    }

    setState((prev) => ({ ...prev, user: data, error: null, isLoading: false }));
  } catch (error) {
    logger.error('Unexpected error during session check:', error);
    setState((prev) => ({ ...prev, user: null, error: null, isLoading: false }));
  }
}, []);


  const signOut = useCallback(async (): Promise<void> => {
    try {
      await authClient.signOut();
    } catch (error) {
      logger.error(error);
    } finally {
      setState((prev) => ({ ...prev, user: null }));
    }
  }, []);

  useEffect(() => {
    checkSession().catch((error) => {
      logger.error(error);
    });
  }, [checkSession]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        checkSession,
        setUser: (user) => setState((prev) => ({ ...prev, user })),
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;
