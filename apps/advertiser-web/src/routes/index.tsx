
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import Home from '../pages/home';
import MyAd from '../pages/myAd';
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
