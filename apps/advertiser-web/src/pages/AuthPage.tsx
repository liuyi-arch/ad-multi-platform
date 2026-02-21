import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@repo/hooks';
import { AuthLayout, AuthTabs, LoginForm, RegisterForm } from '@repo/ui-components';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();

    // 初始化 Auth Hook，并定义成功后的跳转逻辑
    const auth = useAuth((role, mode) => {
        if (mode === 'LOGIN') {
            if (role === 'ADVERTISER') {
                navigate('/home');
            } else {
                // 如果是管理人员在广告主端登录，跳转到管理端
                window.location.href = 'http://localhost:3000'; // 假设管理端在 3000
            }
        } else {
            auth.switchMode('LOGIN');
            alert('注册成功，请登录');
        }
    });

    // Advertiser 端默认角色应该是 ADVERTISER
    useEffect(() => {
        auth.setRole('ADVERTISER');
    }, []);

    return (
        <AuthLayout title="Advertiser">
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
