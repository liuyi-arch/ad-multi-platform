import React from 'react';
import { AuthRole } from '@repo/hooks';

interface AuthTabsProps {
    currentRole: AuthRole;
    onRoleChange: (role: AuthRole) => void;
    mode: 'LOGIN' | 'REGISTER';
}

const AuthTabs: React.FC<AuthTabsProps> = ({ currentRole, onRoleChange, mode }) => {
    const label = mode === 'LOGIN' ? '登录' : '注册';

    return (
        <div className="flex border-b border-[#eef0f2]">
            <button
                onClick={() => onRoleChange('ADVERTISER')}
                className={`flex-1 relative px-6 py-4 text-[15px] font-medium transition-all duration-200 border-b-2 ${currentRole === 'ADVERTISER'
                        ? 'border-[#135bec] text-[#135bec]'
                        : 'border-transparent text-[#8a94a6] hover:text-[#1a1d23]'
                    }`}
            >
                广告主{label}
            </button>
            <button
                onClick={() => onRoleChange('ADMIN')}
                className={`flex-1 relative px-6 py-4 text-[15px] font-medium transition-all duration-200 border-b-2 ${currentRole === 'ADMIN'
                        ? 'border-[#135bec] text-[#135bec]'
                        : 'border-transparent text-[#8a94a6] hover:text-[#1a1d23]'
                    }`}
            >
                管理者{label}
            </button>
        </div>
    );
};

export default AuthTabs;
export { AuthTabs };
