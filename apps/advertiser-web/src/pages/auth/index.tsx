import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@repo/hooks';
import { AuthLayout, AuthTabs, LoginForm, RegisterForm, toast } from '@repo/ui-components';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const {
        role,
        setRole,
        mode,
        setMode,
        handleSubmit,
        formData,
        handleInputChange,
        showPassword,
        togglePasswordVisibility,
        loading,
        switchMode
    } = useAuthStore();

    // 1. 初始挂载：从路径同步模式和角色
    useEffect(() => {
        const path = window.location.pathname;
        const subPath = path.split('/').filter(Boolean).pop()?.toUpperCase();

        // 同步模式
        if (path.includes('/register')) {
            setMode('REGISTER');
        } else {
            setMode('LOGIN');
        }

        // 同步角色 (从 /login/admin 等路径提取)
        if (subPath === 'ADMIN' || subPath === 'ADVERTISER') {
            setRole(subPath as any);
        } else {
            // 默认广告主端进入应为 ADVERTISER
            setRole('ADVERTISER');
        }
    }, [setMode, setRole]);

    // 2. 身份切换逻辑：同步更新 URL
    const handleRoleChange = (newRole: any) => {
        setRole(newRole);
        const base = mode === 'REGISTER' ? '/register' : '/login';
        navigate(`${base}/${newRole.toLowerCase()}`);
    };

    // 3. 提交逻辑
    const handleAuthSubmit = async (e: React.FormEvent) => {
        await handleSubmit(e, {
            onNotify: (msg, type) => toast.show(msg, type),
            onSuccess: (userRole, authMode) => {
                if (authMode === 'LOGIN') {
                    if (userRole === 'ADVERTISER') {
                        navigate('/advertiser/home');
                    } else {
                        window.location.href = ((import.meta as any).env.VITE_ADMIN_URL as string) || '/admin';
                    }
                } else {
                    handleModeSwitch('LOGIN');
                }
            }
        });
    };

    const handleModeSwitch = (newMode: 'LOGIN' | 'REGISTER') => {
        switchMode(newMode);
        navigate(newMode === 'LOGIN' ? '/login' : '/register');
    };

    const authProps = {
        formData,
        handleInputChange,
        showPassword,
        togglePasswordVisibility,
        loading
    };

    return (
        <AuthLayout title={role === 'ADMIN' ? 'Admin' : 'Advertiser'}>
            <AuthTabs
                currentRole={role}
                onRoleChange={handleRoleChange}
                mode={mode}
            />
            {mode === 'LOGIN' ? (
                <LoginForm
                    {...authProps}
                    handleSubmit={handleAuthSubmit}
                    onSwitchToRegister={() => handleModeSwitch('REGISTER')}
                />
            ) : (
                <RegisterForm
                    {...authProps}
                    handleSubmit={handleAuthSubmit}
                    onSwitchToLogin={() => handleModeSwitch('LOGIN')}
                />
            )}
        </AuthLayout>
    );
};

export default AuthPage;
