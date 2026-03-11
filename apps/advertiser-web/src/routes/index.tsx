

import { Navigate, RouteObject } from 'react-router-dom';
import Home from '@/pages/home/index';
import MyAd from '@/pages/myAd/index';
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
    path: '/login/:role',
    element: <AuthPage />,
  },
  {
    path: '/register/:role',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/home',
    element: <RequireAuth><Home /></RequireAuth>,
  },
  {
    path: '/my-ads',
    element: <RequireAuth><MyAd /></RequireAuth>,
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
];
