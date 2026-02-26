
import React from 'react';
import { Navigate, RouteObject, useNavigate } from 'react-router-dom';
import DashboardPage from '../pages/dashboard';
import AdManagementPage from '../pages/ads';
import MediaPage from '../pages/media';
import AnalyticsPage from '../pages/analytics';
import AccessControlPage from '../pages/access';
import AuthPage from '../pages/auth';

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
    element: <DashboardPage />,
  },
  {
    path: '/dashboard',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/ads',
    element: <AdManagementPage />,
  },
  {
    path: '/media',
    element: <MediaPage />,
  },
  {
    path: '/analytics',
    element: <AnalyticsPage />,
  },
  {
    path: '/access',
    element: <AccessControlPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
