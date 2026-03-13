

import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { RequireAuth } from '@repo/ui-components';

const Home = lazy(() => import('@/pages/home/index'));
const MyAd = lazy(() => import('@/pages/myAd/index'));
const AuthPage = lazy(() => import('@/pages/auth/index'));

export const getRoutes = (): RouteObject[] => [
  {
    path: '/login',
    element: <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">正在加载...</div>}><AuthPage /></Suspense>,
  },
  {
    path: '/login/:role',
    element: <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">正在加载...</div>}><AuthPage /></Suspense>,
  },
  {
    path: '/register',
    element: <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">正在加载...</div>}><AuthPage /></Suspense>,
  },
  {
    path: '/register/:role',
    element: <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">正在加载...</div>}><AuthPage /></Suspense>,
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
    element: <RequireAuth><Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">正在加载...</div>}><Home /></Suspense></RequireAuth>,
  },
  {
    path: '/advertiser/my-ads',
    element: <RequireAuth><Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">正在加载...</div>}><MyAd /></Suspense></RequireAuth>,
  },
  {
    path: '*',
    element: <Navigate to="/advertiser/home" replace />,
  },
];
