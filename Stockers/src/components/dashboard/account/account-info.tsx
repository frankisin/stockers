import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useUserContext } from '../../../contexts/user-context';
import { AuthService } from '../../../services/AuthServices';

const userDefault = {
  avatar: '/assets/avatar.png',
  country: 'USA',
  city: 'Los Angeles',
  state: 'California',
  timezone: 'GMT-7',
} as const;

export function AccountInfo(): React.JSX.Element {
  const { user, isLoading } = useUserContext();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = (): void => {
    fileInputRef.current?.click();
  };
  //handler for file uploader
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      console.log('Selected file:', file);

      const result = await AuthService.uploadProfileImage(file);

      console.log('Upload successful:', result);

      // Next step:
      // Refresh the user context so the new avatar appears immediately.
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  if (isLoading) {
    return <Typography>Loading profile...</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar
            src={user?.profileImageUrl || userDefault.avatar}
            sx={{ height: '80px', width: '80px' }}
          />

          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">
              {user?.username}
            </Typography>

            <Typography color="text.secondary" variant="body2">
              {user?.city || userDefault.city}{', '}{user?.state || userDefault.state}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.country || userDefault.country}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          hidden
          onChange={handleFileChange}
        />

        <Button
          fullWidth
          variant="text"
          onClick={handleUploadClick}
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}