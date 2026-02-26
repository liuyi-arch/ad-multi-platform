
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import Home from '../pages/home';
import MyAd from '../pages/myAd';
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
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/my-ads',
    element: <MyAd />,
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
];
