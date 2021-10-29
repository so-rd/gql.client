import { useRoutes } from 'react-router-dom';

import { Landing } from 'src/features/Misc';
import { useAuth } from 'src/lib/auth';

import { protectedRoutes } from './ProtectedRoutes';
import { publicRoutes } from './PublicRoutes';

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
