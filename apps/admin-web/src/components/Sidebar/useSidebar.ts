import { useState } from 'react';
import { useLoginOut } from '@repo/hooks';

export const useSidebar = () => {
    const { handleLogout } = useLoginOut();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return {
        isCollapsed,
        toggleSidebar,
        handleLogout
    };
};
