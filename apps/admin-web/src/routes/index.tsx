
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import AdManagementPage from '../pages/AdManagementPage';
import MediaPage from '../pages/MediaPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import AccessControlPage from '../pages/AccessControlPage';
import { AdItem } from '../types';

interface RouteConfigProps {
  ads: AdItem[];
  openModal: (type: any, ad?: any, mode?: any) => void;
}

export const getRoutes = ({ ads, openModal }: RouteConfigProps): RouteObject[] => [
  {
    path: '/',
    element: (
      <DashboardPage
        ads={ads}
        onDetailClick={(ad) => openModal('DETAIL', ad)}
      />
    ),
  },
  {
    path: '/dashboard',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/ads',
    element: (
      <AdManagementPage
        ads={ads}
        onDetail={(ad) => openModal('DETAIL', ad)}
        onDelete={(ad) => openModal('DELETE', ad)}
        onReject={(ad) => openModal('REJECT_ACTION', ad)}
        onApprove={(ad) => openModal('APPROVE_ACTION', ad)}
        onEdit={(ad) => openModal('FORM', ad, 'EDIT')}
        onViewRejectReason={(ad) => openModal('REJECT_REASON', ad)}
      />
    ),
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
