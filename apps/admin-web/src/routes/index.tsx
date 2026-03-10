
import React from 'react';
import { Navigate, RouteObject, useNavigate } from 'react-router-dom';
import DashboardPage from '@/src/pages/dashboard';
import AdManagementPage from '@/src/pages/ads';
import MediaPage from '@/src/pages/media';
import AnalyticsPage from '@/src/pages/analytics';
import AccessControlPage from '@/src/pages/access';
import AuthPage from '@/src/pages/auth';
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
