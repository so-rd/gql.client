import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// local dependencies
import { MainLayout } from 'src/components/Layout';
import { lazyImport } from 'src/common/lazyImport';

// const { DiscussionsRoutes } = lazyImport(
//   () => import('@/features/discussions'),
//   'DiscussionsRoutes'
// );
const { Dashboard } = lazyImport(
  () => import('src/features/Misc'),
  'Dashboard',
);
// const { Profile } = lazyImport(() => import('@/features/users'), 'Profile');
// const { Users } = lazyImport(() => import('@/features/users'), 'Users');

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<p>L O A D I N G . . .</p>}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      // { path: '/discussions/*', element: <DiscussionsRoutes /> },
      // { path: '/users', element: <Users /> },
      // { path: '/profile', element: <Profile /> },
      { path: '', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
