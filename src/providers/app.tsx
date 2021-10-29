import { ReactNode, Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

// @mantine/core dependencies
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  GlobalStyles,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

// @mui dependencies
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

// local dependencies
import { AuthProvider } from 'src/lib/auth';
import { queryClient } from 'src/lib/app-react-query';
import { GlobalSnackbar } from 'src/components/GlobalSnackbar';

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [colorScheme, setColorScheme] = useState('dark' as ColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <Suspense
      fallback={<LinearProgress color="secondary" data-testid="loading" />}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider theme={{ colorScheme }}>
              <NotificationsProvider>
                <GlobalStyles />
                <GlobalSnackbar />
                <AuthProvider>
                  <Router>{children}</Router>
                </AuthProvider>
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
          {import.meta.env.MODE !== 'test' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
