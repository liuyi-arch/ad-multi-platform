
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import Home from '../pages/home';
import MyAd from '../pages/myAd';
import AuthPage from '../pages/AuthPage';
import { Ad, AdStatus } from '../types';

interface RouteConfigProps {
  ads: Ad[];
  openModal: (type: any, ad?: any, mode?: any) => void;
}

export const getRoutes = ({ ads, openModal }: RouteConfigProps): RouteObject[] => [
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
    element: (
      <Home
        ads={ads.filter((a) => a.status === AdStatus.APPROVED)}
        onOpenDetail={(ad) => openModal('DETAIL', ad)}
        onOpenCreate={() => openModal('FORM', null, 'CREATE')}
      />
    ),
  },
  {
    path: '/my-ads',
    element: (
      <MyAd
        ads={ads}
        onOpenEdit={(ad) => openModal('FORM', ad, 'EDIT')}
        onOpenDelete={(ad) => openModal('DELETE', ad)}
        onOpenRejection={(ad) => openModal('REJECT_REASON', ad)}
        onOpenDetail={(ad) => openModal('DETAIL', ad)}
      />
    ),
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
];
