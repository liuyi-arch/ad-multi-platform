import React from 'react';
import { AuthRole, AuthMode } from '@repo/shared-types';
import { Tab } from '../Tab';

interface AuthTabsProps {
    currentRole: AuthRole;
    onRoleChange: (role: AuthRole) => void;
    mode: AuthMode; // 使用标准 AuthMode
}

const AuthTabs: React.FC<AuthTabsProps> = ({ currentRole, onRoleChange, mode }) => {
    const label = mode === 'LOGIN' ? '登录' : '注册';

    const options = [
        { id: 'ADVERTISER', label: `广告主${label}` },
        { id: 'ADMIN', label: `管理者${label}` }
    ];

    return (
        <Tab
            options={options}
            activeId={currentRole}
            onTabChange={(id) => onRoleChange(id as AuthRole)}
            variant="line"
        />
    );
};

export default AuthTabs;
export { AuthTabs };
