import { useState } from 'react';

export type AuthRole = 'ADVERTISER' | 'ADMIN';
export type AuthMode = 'LOGIN' | 'REGISTER';

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

export const useAuth = (onSuccess?: (role: AuthRole, mode: AuthMode) => void) => {
    const [role, setRole] = useState<AuthRole>('ADVERTISER');
    const [mode, setMode] = useState<AuthMode>('LOGIN');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // 模拟 API 调用
        console.log('Submitting Auth Form:', { role, mode, formData });

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setLoading(false);
                // 模拟登录成功，存储 Token
                if (mode === 'LOGIN') {
                    localStorage.setItem('auth_token', 'mock_jwt_token_for_testing');
                }
                if (onSuccess) {
                    onSuccess(role, mode);
                }
                resolve();
            }, 1000);
        });
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
