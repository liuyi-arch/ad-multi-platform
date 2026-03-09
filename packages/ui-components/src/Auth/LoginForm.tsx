import React from 'react';

import { AuthFormData } from '@repo/shared-types';

interface LoginFormProps {
    formData: AuthFormData; // 消除 any
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    showPassword?: boolean;
    togglePasswordVisibility?: () => void;
    loading?: boolean;
    onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
    formData,
    handleInputChange,
    handleSubmit,
    showPassword,
    togglePasswordVisibility,
    loading,
    onSwitchToRegister,
}) => {
    return (
        <div className="p-8 lg:p-10 space-y-8">
            <div className="space-y-1.5">
                <h1 className="text-[#1a1d23] text-2xl font-bold">欢迎回来</h1>
                <p className="text-[#8a94a6] text-sm">请输入您的账号密码进行登录</p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label className="text-[#1a1d23] text-sm font-medium">手机号</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#135bec] transition-colors">
                            <span className="material-symbols-outlined text-xl">smartphone</span>
                        </div>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="block w-full pl-11 pr-4 py-3 bg-white border border-[#eef0f2] rounded-lg text-[#1a1d23] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#135bec]/5 focus:border-[#135bec] transition-all duration-200"
                            placeholder="请输入手机号"
                            type="tel"
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-[#1a1d23] text-sm font-medium">密码</label>
                        <a className="text-[#135bec] text-xs hover:underline" href="#">忘记密码？</a>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#135bec] transition-colors">
                            <span className="material-symbols-outlined text-xl">lock</span>
                        </div>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="block w-full pl-11 pr-4 py-3 bg-white border border-[#eef0f2] rounded-lg text-[#1a1d23] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#135bec]/5 focus:border-[#135bec] transition-all duration-200"
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
                <div className="pt-3">
                    <button
                        disabled={loading}
                        className={`w-full bg-[#135bec] hover:bg-[#0e4bc4] text-white py-3.5 rounded-lg font-bold text-base transition-all shadow-md shadow-[#135bec]/10 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        type="submit"
                    >
                        {loading ? '正在登录...' : '立即登录'}
                    </button>
                </div>
            </form>
            <div className="pt-2 text-center">
                <p className="text-[#8a94a6] text-sm">
                    没有账号？
                    <button
                        onClick={onSwitchToRegister}
                        className="text-[#135bec] hover:text-[#0e4bc4] font-semibold ml-1 transition-colors"
                    >
                        立即注册
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
export { LoginForm };
