import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@repo/hooks';
import { AuthLayout, AuthTabs, LoginForm, RegisterForm, toast } from '@repo/ui-components';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();

    // 初始化 Auth Hook，并定义成功后的跳转逻辑
    const auth = useAuth({
        onNotify: (msg, type) => toast[type](msg),
        onSuccess: (role, mode) => {
            if (mode === 'LOGIN') {
                if (role === 'ADMIN') {
                    navigate('/dashboard');
                } else {
                    // 如果是广告主在 Admin 端登录，跳转到广告主端
                    window.location.href = 'http://localhost:3002'; // 假设广告主端在 3002
                }
            } else {
                // 注册成功后切换到登录模式
                auth.switchMode('LOGIN');
            }
        }
    });

    // Admin 端默认角色应该是 ADMIN
    useEffect(() => {
        auth.setRole('ADMIN');
    }, []);

    return (
        <AuthLayout title={auth.role === 'ADMIN' ? 'Admin' : 'Advertiser'}>
            <AuthTabs
                currentRole={auth.role}
                onRoleChange={auth.setRole}
                mode={auth.mode}
            />
            {auth.mode === 'LOGIN' ? (
                <LoginForm
                    {...auth}
                    onSwitchToRegister={() => auth.switchMode('REGISTER')}
                />
            ) : (
                <RegisterForm
                    {...auth}
                    onSwitchToLogin={() => auth.switchMode('LOGIN')}
                />
            )}
        </AuthLayout>
    );
};

export default AuthPage;
