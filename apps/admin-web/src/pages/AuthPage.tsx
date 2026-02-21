import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@repo/hooks';
import { AuthLayout, AuthTabs, LoginForm, RegisterForm } from '@repo/ui-components';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();

    // 初始化 Auth Hook，并定义成功后的跳转逻辑
    const auth = useAuth((role, mode) => {
        if (mode === 'LOGIN') {
            if (role === 'ADMIN') {
                navigate('/dashboard');
            } else {
                // 如果是广告主在 Admin 端登录，通常应该报错或者引导去广告主端
                // 这里为了演示，假设广告主也可以在此登录并跳转（实际项目中建议分开）
                window.location.href = 'http://localhost:3001'; // 假设广告主端在 3001
            }
        } else {
            // 注册成功后切换到登录模式
            auth.switchMode('LOGIN');
            alert('注册成功，请登录');
        }
    });

    // Admin 端默认角色应该是 ADMIN
    useEffect(() => {
        auth.setRole('ADMIN');
    }, []);

    return (
        <AuthLayout title="Admin">
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
