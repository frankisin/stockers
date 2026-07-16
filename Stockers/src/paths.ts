export const paths = {
  home: '/',
  auth: { signIn: '/login', signUp: '/register', resetPassword: '/auth/reset-password' },
  portfolio : '/portfolio',
  dashboard: {
    overview: '/dashboard',
    account: '/account',
    portfolio: '/portfolio',
    customers: '/customers',
    settings: '/settings',
    analysis: '/analysis'
  },
  errors: { notFound: '/errors/not-found' },
} as const;
