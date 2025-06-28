export const paths = {
  home: '/',
  auth: { signIn: '/login', signUp: '/register', resetPassword: '/auth/reset-password' },
  portfolio : '/portfolio',
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    portfolio: '/portfolio',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
