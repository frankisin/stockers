import React from 'react';
import { SignInForm } from '../../../components/auth/sign-in-form';
import GuestGuard from '../../../components/auth/guest-guard';
import Layout from '../../../components/auth/layout';

// Optional: Set page title manually (since you don't have next/head)
import { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    document.title = 'Sign in | Auth | Starkware'; // Replace with your app name
  }, []);

  return (
    <Layout>
      <GuestGuard>
        <SignInForm />
      </GuestGuard>
    </Layout>
  );
};

export default LoginPage;
