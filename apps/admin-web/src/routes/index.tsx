

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
    element: <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">正在加载...</div>}><AuthPage /></Suspense>,
  },
  {
    path: '/register',
    element: <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">正在加载...</div>}><AuthPage /></Suspense>,
  },
  {
    path: '/',
    element: <RequireAuth><Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">正在加载...</div>}><DashboardPage /></Suspense></RequireAuth>,
  },
  {
    path: '/dashboard',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/ads',
    element: <RequireAuth><Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">正在加载...</div>}><AdManagementPage /></Suspense></RequireAuth>,
  },
  {
    path: '/media',
    element: <RequireAuth><Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">正在加载...</div>}><MediaPage /></Suspense></RequireAuth>,
  },
  {
    path: '/analytics',
    element: <RequireAuth><Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">正在加载...</div>}><AnalyticsPage /></Suspense></RequireAuth>,
  },
  {
    path: '/access',
    element: <RequireAuth><Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">正在加载...</div>}><AccessControlPage /></Suspense></RequireAuth>,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
