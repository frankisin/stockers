import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '../../../config';
import { Notifications } from '../../../components/dashboard/settings/notifications';
import { UpdatePasswordForm } from '../../../components/dashboard/settings/update-password-form';
import Layout from '../layout';

export const metadata = { title: `Settings | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Settings(): React.JSX.Element {
  return (
    <Layout>
         <Stack spacing={3}>
      <div>
        <Typography variant="h4">Settings</Typography>
      </div>
      <Notifications />
      <UpdatePasswordForm />
    </Stack>
    </Layout>
 
  );
}
