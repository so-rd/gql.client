import { lazyImport } from 'src/common/lazyImport';

const { AuthRoutes } = lazyImport(
  () => import('src/features/Auth'),
  'AuthRoutes',
);

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
];
