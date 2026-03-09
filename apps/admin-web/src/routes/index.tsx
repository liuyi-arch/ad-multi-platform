
import React from 'react';
import { Navigate, RouteObject, useNavigate } from 'react-router-dom';
import DashboardPage from '../pages/dashboard';
import AdManagementPage from '../pages/ads';
import MediaPage from '../pages/media';
import AnalyticsPage from '../pages/analytics';
import AccessControlPage from '../pages/access';
import AuthPage from '../pages/auth';
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
