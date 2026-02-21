import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f6f6f8] font-sans">
            {/* Logo Section */}
            <div className="mb-10 flex items-center gap-2.5">
                <div className="bg-[#135bec] p-2 rounded-lg shadow-lg shadow-[#135bec]/20">
                    <span className="material-symbols-outlined text-white text-2xl">ads_click</span>
                </div>
                <span className="text-[#1a1d23] text-2xl font-bold tracking-tight">AdWall {title}</span>
            </div>

            {/* Main Content Card */}
            <div className="w-full max-w-[440px] bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] border border-[#eef0f2] overflow-hidden">
                {children}
            </div>

            {/* Footer Section */}
            <div className="mt-16 text-center space-y-4">
                <div className="flex items-center justify-center gap-8">
                    <a className="text-[#8a94a6] hover:text-[#135bec] text-xs transition-colors" href="#">帮助中心</a>
                    <a className="text-[#8a94a6] hover:text-[#135bec] text-xs transition-colors" href="#">服务协议</a>
                    <a className="text-[#8a94a6] hover:text-[#135bec] text-xs transition-colors" href="#">隐私政策</a>
                </div>
                <p className="text-[#8a94a6]/50 text-[11px] font-medium uppercase">
                    © 2024 ADWALL TECHNOLOGIES. ALL RIGHTS RESERVED.
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;
export { AuthLayout };
