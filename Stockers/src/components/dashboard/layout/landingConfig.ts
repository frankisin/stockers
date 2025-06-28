import type { NavItemConfig } from '../../../types/nav';
import { paths } from '../../../paths';

export const navItems = [
  
  { key: 'singin', title: 'Login', href: paths.auth.signIn, icon: 'user' },
  { key: 'singup', title: 'Register', href: paths.auth.signUp, icon: 'chart-pie' },

] satisfies NavItemConfig[];
