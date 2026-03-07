import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './useAuthStore';

export const useLoginOut = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return {
        handleLogout
    };
};
