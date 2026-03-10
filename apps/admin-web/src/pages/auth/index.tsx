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

    // Admin 端默认角色应该是 ADMIN
    useEffect(() => {
        setRole('ADMIN');
    }, [setRole]);

    const handleAuthSubmit = async (e: React.FormEvent) => {
        await handleSubmit(e, {
            onNotify: (msg, type) => toast.show(msg, type),
            onSuccess: (userRole, authMode) => {
                if (authMode === 'LOGIN') {
                    if (userRole === 'ADMIN') {
                        navigate('/dashboard');
                    } else {
                        // 如果是广告主在 Admin 端登录，跳转到广告主端
                        window.location.href = '/advertiser';
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
