import type { User } from '../../types/user';
import api from '../../services/api'; 
import { logger } from '../default-logger';

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    return { error: 'Sign-up not implemented yet' };
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    try {
      const response = await api.post('/auth/login', {
        username: email,
        password,
      });

      const { Token } = response.data;

      if (!Token) {
        return { error: 'No token received from server' };
      }

      localStorage.setItem('token', Token);
      return {};
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || 'Login failed';
      return { error: message };
    }
  }

  async getUser(): Promise<{ data: User | null; error?: string }> {
  const token = localStorage.getItem('token');

  if (!token) {
    logger.error('No token found');
    return { data: null, error: 'No token found' };
  }

  try {
    const response = await api.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return { data: response.data };
  } catch (error: any) {
    logger.error(error);
    return { data: null, error: error?.message || 'Failed to fetch user' };
  }
}


  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update password not implemented' };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('token');
    return {};
  }
}

export const authClient = new AuthClient();
