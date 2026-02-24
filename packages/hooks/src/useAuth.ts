import { useState } from 'react';
import { authService } from '@repo/api';
import { AuthRole, AuthMode } from '@repo/shared-types';

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
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    loading: boolean;
}

export const useAuth = (options: UseAuthOptions = {}) => {
    const { onSuccess, onError, onNotify } = options;
    const [role, setRoleState] = useState<AuthRole>('ADVERTISER');
    const [mode, setMode] = useState<AuthMode>('LOGIN');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        confirmPassword: '',
    });

    // 封装 setRole，切换角色时清空表单
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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    /**
     * 表单验证逻辑
     */
    const validate = (): boolean => {
        const notifyError = (msg: string) => {
            if (onNotify) onNotify(msg, 'error');
            else if (onError) onError(msg);
        };

        // 1. 手机号基本校验
        if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
            notifyError('请输入正确的11位手机号码');
            return false;
        }

        // 2. 密码长度校验
        if (formData.password.length < 6) {
            notifyError('密码长度至少需要6位');
            return false;
        }

        // 3. 注册模式下的二次确认
        if (mode === 'REGISTER' && formData.password !== formData.confirmPassword) {
            notifyError('两次输入的密码不一致');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            const data = {
                ...formData,
                role // 显式传递角色
            };

            const result = mode === 'LOGIN'
                ? await authService.login(data)
                : await authService.register(data);

            // 存储 Token
            if (result.token) {
                localStorage.setItem('auth_token', result.token);
                localStorage.setItem('user_role', role);
            }

            const successMsg = `${mode === 'LOGIN' ? '登录' : '注册'}成功`;
            if (onNotify) onNotify(successMsg, 'success');

            if (onSuccess) {
                // 确保 Toast 已经渲染后再跳转（可选延时，但目前全局容器应能处理）
                onSuccess(role, mode);
            }
        } catch (error: any) {
            console.error('Auth Error:', error);
            const msg = error.response?.data?.message || '服务器响应异常，请稍后重试';

            if (onNotify) onNotify(msg, 'error');
            else if (onError) onError(msg);

            // 如果注册失败（例如手机号重复），根据要求清空表单
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
    };
};
