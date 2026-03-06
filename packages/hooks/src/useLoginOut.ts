import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useLoginOut = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return {
        handleLogout
    };
};
