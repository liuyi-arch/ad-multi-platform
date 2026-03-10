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
        switchMode,
        handleSubmit,
        formData,
        handleInputChange,
        showPassword,
        togglePasswordVisibility,
        loading
    } = useAuthStore();

    // Advertiser 端默认角色应该是 ADVERTISER
    useEffect(() => {
        setRole('ADVERTISER');
    }, [setRole]);

    const handleAuthSubmit = async (e: React.FormEvent) => {
        await handleSubmit(e, {
            onNotify: (msg, type) => toast.show(msg, type),
            onSuccess: (userRole, authMode) => {
                if (authMode === 'LOGIN') {
                    if (userRole === 'ADVERTISER') {
                        navigate('/home');
                    } else {
                        // 如果是管理人员在广告主端登录，跳转到管理端
                        window.location.href = ((import.meta as any).env.VITE_ADMIN_URL as string) || '/admin';
                    }
                } else {
                    switchMode('LOGIN');
                }
            }
        });
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
                onRoleChange={setRole}
                mode={mode}
            />
            {mode === 'LOGIN' ? (
                <LoginForm
                    {...authProps}
                    handleSubmit={handleAuthSubmit}
                    onSwitchToRegister={() => switchMode('REGISTER')}
                />
            ) : (
                <RegisterForm
                    {...authProps}
                    handleSubmit={handleAuthSubmit}
                    onSwitchToLogin={() => switchMode('LOGIN')}
                />
            )}
        </AuthLayout>
    );
};

export default AuthPage;
