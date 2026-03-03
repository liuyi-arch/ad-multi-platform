import { useState } from 'react';
import { authService } from '@repo/api';
import { AuthRole, AuthMode, AuthFormData } from '@repo/shared-types';
import { validateAuthForm } from '@repo/utils';

export interface UseAuthOptions {
    onSuccess?: (role: AuthRole, mode: AuthMode) => void;
    onError?: (message: string) => void;
    onNotify?: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

export interface UseAuthReturn {
    role: AuthRole;
    setRole: (role: AuthRole) => void;
    mode: AuthMode;
    switchMode: (newMode: AuthMode) => void;
    showPassword: boolean;
    togglePasswordVisibility: () => void;
    formData: AuthFormData; // 消除 any
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    loading: boolean;
    user: { phone?: string; role?: AuthRole } | null;
    logout: () => void;
}

export const useAuth = (options: UseAuthOptions = {}): UseAuthReturn => {
    const { onSuccess, onError, onNotify } = options;
    const [role, setRoleState] = useState<AuthRole>('ADVERTISER');
    const [mode, setMode] = useState<AuthMode>('LOGIN');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<AuthFormData>({
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [user, setUser] = useState<{ phone?: string; role?: AuthRole } | null>(() => {
        const savedRole = localStorage.getItem('user_role') as AuthRole;
        const savedPhone = localStorage.getItem('user_phone');
        return savedRole ? { role: savedRole, phone: savedPhone || undefined } : null;
    });

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_phone');
        setUser(null);
    };

    const setRole = (newRole: AuthRole) => {
        setRoleState(newRole);
        setFormData({
            phone: '',
            password: '',
            confirmPassword: '',
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: AuthFormData) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 使用 utils 中的通用验证逻辑
        const errorMsg = validateAuthForm(formData, mode);
        if (errorMsg) {
            if (onNotify) onNotify(errorMsg, 'error');
            else if (onError) onError(errorMsg);
            return;
        }

        setLoading(true);

        try {
            const data = {
                phone: formData.phone,
                password: formData.password,
                role
            };

            const result = mode === 'LOGIN'
                ? await authService.login(data)
                : await authService.register(data);

            if (result.token) {
                localStorage.setItem('auth_token', result.token);
                localStorage.setItem('user_role', role);
                localStorage.setItem('user_phone', formData.phone);
                setUser({ role, phone: formData.phone });
            }

            const successMsg = `${mode === 'LOGIN' ? '登录' : '注册'}成功`;
            if (onNotify) onNotify(successMsg, 'success');

            if (onSuccess) {
                onSuccess(role, mode);
            }
        } catch (error: any) {
            console.error('Auth Error:', error);
            const msg = error.response?.data?.message || '服务器响应异常，请稍后重试';

            if (onNotify) onNotify(msg, 'error');
            else if (onError) onError(msg);

            if (mode === 'REGISTER') {
                setFormData({
                    phone: '',
                    password: '',
                    confirmPassword: '',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const switchMode = (newMode: AuthMode) => {
        setMode(newMode);
        setFormData({
            phone: '',
            password: '',
            confirmPassword: '',
        });
    };

    return {
        role,
        setRole,
        mode,
        switchMode,
        showPassword,
        togglePasswordVisibility,
        formData,
        handleInputChange,
        handleSubmit,
        loading,
        user,
        logout,
    };
};
