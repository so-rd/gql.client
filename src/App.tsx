import { AppProvider } from 'src/providers/app';
import { AppRoutes } from 'src/routes';

export const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};
