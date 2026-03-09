import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@repo/hooks';

interface RequireAuthProps {
    children: React.ReactNode;
    redirectTo?: string;
}

/**
 * 路由守卫组件
 * 检查用户是否已登录，未登录则重定向
 */
export const RequireAuth: React.FC<RequireAuthProps> = ({
    children,
    redirectTo = '/login'
}) => {
    const { user, token } = useAuthStore();
    const location = useLocation();

    if (!user || !token) {
        // 将当前尝试访问的路径保存，以便登录后跳转回来
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};
