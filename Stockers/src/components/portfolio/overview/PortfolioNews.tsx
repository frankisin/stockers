'use client';

import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { mockNews } from './mockNews';

export function PortfolioNews(): React.JSX.Element {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', mt: 4, px: 2 }}>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          backgroundColor: 'white',
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ fontFamily: 'Inter, sans-serif', mb: 2 }}
        >
          Latest Market Insights
        </Typography>

        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 6,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.grey[300],
              borderRadius: 3,
            },
          }}
        >
          {mockNews.map((news) => (
            <Card
              key={news.id}
              sx={{
                minWidth: 300,
                maxWidth: 320,
                flexShrink: 0,
                borderRadius: 2,
                boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 160, objectFit: 'cover' }} // display size
                image={news.image.replace('h=180', 'h=320')} // request higher-res image
                alt={news.title}
                />

              <CardContent>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  {news.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {news.summary}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Card>
    </Box>
  );
}
