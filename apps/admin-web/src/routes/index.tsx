

import { Navigate, RouteObject } from 'react-router-dom';
import DashboardPage from '@/pages/dashboard/index';
import AdManagementPage from '@/pages/ads/index';
import MediaPage from '@/pages/media/index';
import AnalyticsPage from '@/pages/analytics/index';
import AccessControlPage from '@/pages/access/index';
import AuthPage from '@/pages/auth/index';
import { RequireAuth } from '@repo/ui-components';

export const getRoutes = (): RouteObject[] => [
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/register',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: <RequireAuth><DashboardPage /></RequireAuth>,
  },
  {
    path: '/dashboard',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/ads',
    element: <RequireAuth><AdManagementPage /></RequireAuth>,
  },
  {
    path: '/media',
    element: <RequireAuth><MediaPage /></RequireAuth>,
  },
  {
    path: '/analytics',
    element: <RequireAuth><AnalyticsPage /></RequireAuth>,
  },
  {
    path: '/access',
    element: <RequireAuth><AccessControlPage /></RequireAuth>,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
