import { SearchBox, UserMenu } from '@repo/ui-components';
import { ViewType } from '../../types';
import { useAuthStore, useLoginOut } from '@repo/hooks';

interface HeaderProps {
  title: string;
  action?: React.ReactNode;
  currentNav?: ViewType;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title, action, currentNav, searchQuery, onSearchChange }) => {
  const { user } = useAuthStore();
  const { handleLogout } = useLoginOut();

  return (
    <header className="flex items-center bg-surface border-b border-border-light px-8 py-4 sticky top-0 z-10 gap-8 min-h-[64px]">
      <div className="flex items-center gap-6 flex-1">
        <h2 className="text-lg font-bold text-text-main whitespace-nowrap">{title}</h2>
        <SearchBox value={searchQuery} onChange={onSearchChange} variant="global" />
      </div>

      <div className="flex items-center gap-6">
        {(!currentNav || !['dashboard', 'analytics', 'access'].includes(currentNav)) && action}

        <UserMenu
          user={user ? {
            name: 'Alex Rivera',
            role: 'Administrator',
            phone: user.phone,
            avatar: (user as any).avatar
          } : null}
          onLogout={handleLogout}
          variant="admin"
        />
      </div>
    </header>
  );
};

export default Header;
