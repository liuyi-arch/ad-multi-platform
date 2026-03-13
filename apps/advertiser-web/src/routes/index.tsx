

import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { RequireAuth } from '@repo/ui-components';

const Home = lazy(() => import('@/pages/home/index'));
const MyAd = lazy(() => import('@/pages/myAd/index'));
const AuthPage = lazy(() => import('@/pages/auth/index'));

export const getRoutes = (): RouteObject[] => [
  {
    path: '/login',
    element: <Suspense fallback={<Loading />}><AuthPage /></Suspense>,
  },
  {
    path: '/login/:role',
    element: <Suspense fallback={<Loading />}><AuthPage /></Suspense>,
  },
  {
    path: '/register',
    element: <Suspense fallback={<Loading />}><AuthPage /></Suspense>,
  },
  {
    path: '/register/:role',
    element: <Suspense fallback={<Loading />}><AuthPage /></Suspense>,
  },
  {
    path: '/',
    element: <Navigate to="/advertiser/home" replace />,
  },
  {
    path: '/advertiser',
    element: <Navigate to="/advertiser/home" replace />,
  },
  {
    path: '/advertiser/home',
    element: <RequireAuth><Suspense fallback={<Loading />}><Home /></Suspense></RequireAuth>,
  },
  {
    path: '/advertiser/my-ads',
    element: <RequireAuth><Suspense fallback={<Loading />}><MyAd /></Suspense></RequireAuth>,
  },
  {
    path: '*',
    element: <Navigate to="/advertiser/home" replace />,
  },
];
