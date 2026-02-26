import React from 'react';

import { AuthFormData } from '@repo/shared-types';

interface RegisterFormProps {
    formData: AuthFormData; // 消除 any
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    showPassword?: boolean;
    togglePasswordVisibility?: () => void;
    loading?: boolean;
    onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    formData,
    handleInputChange,
    handleSubmit,
    showPassword,
    togglePasswordVisibility,
    loading,
    onSwitchToLogin,
}) => {
    return (
        <div className="p-8 lg:p-10 space-y-8">
            <div className="space-y-2">
                <h1 className="text-[#1a1d23] text-2xl font-bold tracking-tight">创建新账号</h1>
                <p className="text-[#8a94a6] text-sm">请填写以下信息以完成注册申请</p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label className="text-[#1a1d23] text-sm font-semibold">手机号</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#135bec] transition-colors">
                            <span className="material-symbols-outlined text-xl">smartphone</span>
                        </div>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="block w-full pl-11 pr-4 py-3 bg-white border border-[#eef0f2] rounded-lg text-[#1a1d23] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#135bec]/10 focus:border-[#135bec] transition-all duration-200"
                            placeholder="请输入您的手机号"
                            type="tel"
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[#1a1d23] text-sm font-semibold">密码</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#135bec] transition-colors">
                            <span className="material-symbols-outlined text-xl">lock</span>
                        </div>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="block w-full pl-11 pr-4 py-3 bg-white border border-[#eef0f2] rounded-lg text-[#1a1d23] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#135bec]/10 focus:border-[#135bec] transition-all duration-200"
                            placeholder="请输入密码"
                            type={showPassword ? 'text' : 'password'}
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#1a1d23] transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">
                                {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                        </button>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[#1a1d23] text-sm font-semibold">确认密码</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#135bec] transition-colors">
                            <span className="material-symbols-outlined text-xl">lock_reset</span>
                        </div>
                        <input
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="block w-full pl-11 pr-4 py-3 bg-white border border-[#eef0f2] rounded-lg text-[#1a1d23] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#135bec]/10 focus:border-[#135bec] transition-all duration-200"
                            placeholder="请再次输入密码"
                            type={showPassword ? 'text' : 'password'}
                            required
                        />
                    </div>
                </div>
                <div className="pt-2">
                    <button
                        disabled={loading}
                        className={`w-full bg-[#135bec] hover:bg-[#0e4bc4] text-white py-3.5 rounded-lg font-bold text-base transition-all shadow-md shadow-[#135bec]/10 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        type="submit"
                    >
                        {loading ? '正在注册...' : '立即注册'}
                        {!loading && <span className="material-symbols-outlined text-lg">person_add</span>}
                    </button>
                </div>
            </form>
            <div className="pt-2 text-center">
                <p className="text-[#8a94a6] text-sm">
                    已有账号？
                    <button
                        onClick={onSwitchToLogin}
                        className="text-[#135bec] hover:text-[#0e4bc4] font-semibold ml-1 transition-colors"
                    >
                        返回登录
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
export { RegisterForm };
