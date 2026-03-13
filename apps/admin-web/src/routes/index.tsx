

import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { RequireAuth } from '@repo/ui-components';

const DashboardPage = lazy(() => import('@/pages/dashboard/index'));
const AdManagementPage = lazy(() => import('@/pages/ads/index'));
const MediaPage = lazy(() => import('@/pages/media/index'));
const AnalyticsPage = lazy(() => import('@/pages/analytics/index'));
const AccessControlPage = lazy(() => import('@/pages/access/index'));
const AuthPage = lazy(() => import('@/pages/auth/index'));

export const getRoutes = (): RouteObject[] => [
  {
    path: '/login',
    element: <Suspense fallback={<Loading />}><AuthPage /></Suspense>,
  },
  {
    path: '/register',
    element: <Suspense fallback={<Loading />}><AuthPage /></Suspense>,
  },
  {
    path: '/',
    element: <RequireAuth><Suspense fallback={<Loading />}><DashboardPage /></Suspense></RequireAuth>,
  },
  {
    path: '/dashboard',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/ads',
    element: <RequireAuth><Suspense fallback={<Loading />}><AdManagementPage /></Suspense></RequireAuth>,
  },
  {
    path: '/media',
    element: <RequireAuth><Suspense fallback={<Loading />}><MediaPage /></Suspense></RequireAuth>,
  },
  {
    path: '/analytics',
    element: <RequireAuth><Suspense fallback={<Loading />}><AnalyticsPage /></Suspense></RequireAuth>,
  },
  {
    path: '/access',
    element: <RequireAuth><Suspense fallback={<Loading />}><AccessControlPage /></Suspense></RequireAuth>,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
