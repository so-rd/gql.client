/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactNode } from 'react';
import userEvent from '@testing-library/user-event';
import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from 'react-query';

// @mui dependencies
import { ThemeProvider } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// Local Dependencies
import { AuthProvider } from 'src/lib/auth';
import { userGenerator } from './data-generators';
import { db } from './server/db';

export const createUser = (userProperties?: any) => {
  const user = userGenerator(userProperties);
  db.user.create({ ...user, password: user.password });
  return user;
};

export const waitForLoadingToFinish = () => {
  const loadingElements = screen.queryAllByTestId(/loading/i);

  if (loadingElements.length) {
    return waitForElementToBeRemoved(
      () => [...screen.queryAllByTestId(/loading/i)],
      {
        timeout: 1000,
      },
    );
  }
  return Promise.resolve();
};

// Create a client
const queryClient = new QueryClient();

const render = async (ui: any, defaultFormValues?: any) => {
  const Wrapper = ({ children = null }: { children: ReactNode }) => {
    const methods = useForm({
      defaultValues: defaultFormValues,
    });
    return (
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns as any}>
          <AuthProvider>
            <Router>
              <FormProvider {...methods}>{children}</FormProvider>
            </Router>
          </AuthProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    );
  };

  const returnValue = {
    ...rtlRender(ui, {
      // @ts-ignore
      wrapper: Wrapper,
    }),
  };

  await waitForLoadingToFinish();

  return returnValue;
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render, userEvent };
