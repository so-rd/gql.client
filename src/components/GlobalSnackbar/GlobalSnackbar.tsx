import { useEffect } from 'react';
import { useAtom } from 'jotai';

// @mantine/core
import { useNotifications } from '@mantine/notifications';

// local dependencies
import { snackbarState } from './snackbarState';

export const GlobalSnackbar = () => {
  const [state] = useAtom(snackbarState);

  const notifications = useNotifications();

  useEffect(() => {
    if (state.title) {
      notifications.showNotification({ ...state });
    }
  }, [state]);

  return null;
};
