import { AppProvider } from 'src/providers/app';
import { AppRoutes } from 'src/routes';
import { ThemeToggle } from './components/ThemeToggle';

export const App = () => {
  return (
    <AppProvider>
      <ThemeToggle />
      <AppRoutes />
    </AppProvider>
  );
};
