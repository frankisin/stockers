'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import Fade from '@mui/material/Fade';
import dayjs from 'dayjs';
import Grow from "@mui/material/Grow";
import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';

import { CustomersFilters } from '../../../components/dashboard/customer/customers-filters';
import { CustomersTable } from '../../../components/dashboard/customer/customers-table';
import type { Customer } from '../../../components/dashboard/customer/customers-table';
import Layout from '../layout';

const customers = [
  {
    id: 'USR-010',
    name: 'Alcides Antonio',
    avatar: '/assets/avatar-10.png',
    email: 'alcides.antonio@devias.io',
    phone: '908-691-3242',
    address: {
      city: 'Madrid',
      country: 'Spain',
      state: 'Comunidad de Madrid',
      street: '4158 Hedge Street',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-009',
    name: 'Marcus Finn',
    avatar: '/assets/avatar-9.png',
    email: 'marcus.finn@devias.io',
    phone: '415-907-2647',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188 Armbrester Drive',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-008',
    name: 'Jie Yan',
    avatar: '/assets/avatar-8.png',
    email: 'jie.yan.song@devias.io',
    phone: '770-635-2682',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894 Lakeland Park Drive',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-007',
    name: 'Nasimiyu Danai',
    avatar: '/assets/avatar-7.png',
    email: 'nasimiyu.danai@devias.io',
    phone: '801-301-7894',
    address: {
      city: 'Salt Lake City',
      country: 'USA',
      state: 'Utah',
      street: '368 Lamberts Branch Road',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-006',
    name: 'Iulia Albu',
    avatar: '/assets/avatar-6.png',
    email: 'iulia.albu@devias.io',
    phone: '313-812-8947',
    address: {
      city: 'Murray',
      country: 'USA',
      state: 'Utah',
      street: '3934 Wildrose Lane',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-005',
    name: 'Fran Perez',
    avatar: '/assets/avatar-5.png',
    email: 'fran.perez@devias.io',
    phone: '712-351-5711',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865 Pleasant Hill Road',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-004',
    name: 'Penjani Inyene',
    avatar: '/assets/avatar-4.png',
    email: 'penjani.inyene@devias.io',
    phone: '858-602-3409',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-003',
    name: 'Carson Darrin',
    avatar: '/assets/avatar-3.png',
    email: 'carson.darrin@devias.io',
    phone: '304-428-3097',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-002',
    name: 'Siegbert Gottfried',
    avatar: '/assets/avatar-2.png',
    email: 'siegbert.gottfried@devias.io',
    phone: '702-661-1654',
    address: {
      city: 'Los Angeles',
      country: 'USA',
      state: 'California',
      street: '1798 Hickory Ridge Drive',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-001',
    name: 'Miron Vitold',
    avatar: '/assets/avatar-1.png',
    email: 'miron.vitold@devias.io',
    phone: '972-333-4106',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
] satisfies Customer[];




export default function Customers(): React.JSX.Element {
  const [report, setReport] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [showReports, setShowReports] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const reportsTriggerRef = React.useRef<HTMLDivElement>(null);
  const reportsRef = React.useRef<HTMLDivElement>(null);





  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  const canSubmit = report.trim().length > 0 || selectedFile !== null;

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  };
  React.useEffect(() => {
  const previousScrollRestoration = window.history.scrollRestoration;

  window.history.scrollRestoration = 'manual';

  const frame = window.requestAnimationFrame(() => {
    window.scrollTo(0, 0);
  });

  return () => {
    window.cancelAnimationFrame(frame);
    window.history.scrollRestoration = previousScrollRestoration;
  };
}, []);

  const handleAnalyze = async (): Promise<void> => {
    if (!canSubmit || isAnalyzing) {
      return;
    }

    try {
      setIsAnalyzing(true);

      // Replace this with your API request.
      console.log({
        report,
        selectedFile,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Unable to analyze report:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  React.useEffect(() => {
  const triggerElement = reportsTriggerRef.current;

  if (!triggerElement) {
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShowReports(true);
        observer.disconnect();
      }
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(triggerElement);

  return () => observer.disconnect();
}, []);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void handleAnalyze();
    }
  };
  const handleScrollToReports = (): void => {
    setShowReports(true);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        reportsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  };

  return (
    <Layout>

      <Stack spacing={6}>
        <Box
          component="section"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '60vh',
            px: 2,
            py: 6,
          }}
        >
          <Stack
            spacing={3}
            sx={{
              maxWidth: 760,
              width: '100%',
            }}
          >
            <Stack spacing={6} sx={{ textAlign: 'center' }}>
              <Typography
                component="h1"
                variant="h3"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}
              >
                Have something to report?
              </Typography>

              <Typography color="text.secondary" variant="body1">
                Paste a suspicious email, describe what happened, or upload a
                screenshot for IntelliSight to analyze.
              </Typography>
            </Stack>
            <Grow in timeout={500}>
              <Paper
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  boxShadow: '0 12px 40px rgba(15, 23, 42, 0.08)',
                  overflow: 'hidden',
                  p: 1.5,
                  transition: 'border-color 150ms ease, box-shadow 150ms ease',
                  '&:focus-within': {
                    borderColor: 'primary.main',
                    boxShadow: '0 12px 40px rgba(15, 23, 42, 0.12)',
                  },
                }}
              >
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={10}
                  value={report}
                  onChange={(event) => setReport(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Paste the suspicious email or describe the message..."
                  variant="standard"
                  slotProps={{
                    input: {
                      disableUnderline: true,
                      sx: {
                        alignItems: 'flex-start',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        px: 1,
                        py: 0.5,
                      },
                    },
                  }}
                />

                {selectedFile ? (
                  <Box
                    sx={{
                      bgcolor: 'action.hover',
                      borderRadius: 1.5,
                      mt: 1,
                      px: 1.5,
                      py: 1,
                    }}
                  >
                    <Typography noWrap variant="body2">
                      {selectedFile.name}
                    </Typography>
                  </Box>
                ) : null}

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 1,
                  }}
                >
                  <input
                    ref={fileInputRef}
                    hidden
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                  />

                  <Button
                    color="inherit"
                    startIcon={<PaperclipIcon />}
                    onClick={() => fileInputRef.current?.click()}
                    sx={{ borderRadius: 2 }}
                  >
                    Upload screenshot
                  </Button>

                  <Button
                    variant="contained"
                    disabled={!canSubmit || isAnalyzing}
                    onClick={() => void handleAnalyze()}
                    endIcon={
                      isAnalyzing ? (
                        <CircularProgress color="inherit" size={16} />
                      ) : (
                        <ArrowUpIcon />
                      )
                    }
                    sx={{
                      borderRadius: 2,
                      minWidth: 112,
                    }}
                  >
                    {isAnalyzing ? 'Analyzing' : 'Analyze'}
                  </Button>
                </Stack>
              </Paper>
            </Grow>


            <Typography
              color="text.secondary"
              variant="caption"
              sx={{ textAlign: 'center' }}
            >
              Press Enter to analyze. Use Shift + Enter for a new line.
            </Typography>
          </Stack>
        </Box>
        <Box
          component="button"
          type="button"
          onClick={handleScrollToReports}
          aria-label="Scroll down to recent reports"
          sx={{
            alignItems: 'center',
            background: 'none',
            border: 0,
            color: 'text.secondary',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: 0.75,
            mt: 5,
            p: 1,
            transition: 'color 180ms ease',
            '&:hover': {
              color: 'text.primary',
            },
            '&:focus-visible': {
              borderRadius: 2,
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 3,
            },
          }}
        >
          <Typography
            component="span"
            variant="caption"
            sx={{
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
          >
            Scroll down to see recent reports
          </Typography>

          <Box
            sx={{
              animation: 'scrollCue 1.8s ease-in-out infinite',
              display: 'flex',
              '@keyframes scrollCue': {
                '0%, 100%': {
                  opacity: 0.45,
                  transform: 'translateY(0)',
                },
                '50%': {
                  opacity: 1,
                  transform: 'translateY(7px)',
                },
              },
            }}
          >
            <CaretDownIcon size={22} />
          </Box>
        </Box>

        <Box
          ref={reportsTriggerRef}
          aria-hidden="true"
          sx={{
            height: 1,
            width: '100%',
          }}
        />

        {showReports ? (
          <Box
            ref={reportsRef}
            component="section"
            sx={{
              scrollMarginTop: 32,
              minHeight: '70vh',
              px: { xs: 2, md: 4 },
              pb: 8,
              pt: 6,
            }}
          >
            <Fade in timeout={700}>
              <Stack
                spacing={3}
                sx={{
                  animation:
                    'reportsReveal 700ms cubic-bezier(0.22, 1, 0.36, 1)',
                  '@keyframes reportsReveal': {
                    from: {
                      opacity: 0,
                      transform: 'translateY(32px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                <Stack spacing={0.5}>
                  <Typography variant="h4">
                    Recent reports
                  </Typography>

                  <Typography color="text.secondary" variant="body2">
                    Previously submitted phishing reports and their current status.
                  </Typography>
                </Stack>

                <CustomersFilters />

                <CustomersTable
                  count={customers.length}
                  page={page}
                  rows={paginatedCustomers}
                  rowsPerPage={rowsPerPage}
                />
              </Stack>
            </Fade>
          </Box>
        ) : null}
      </Stack>


    </Layout>
  );
}


function applyPagination(
  rows: Customer[],
  page: number,
  rowsPerPage: number
): Customer[] {
  return rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
}