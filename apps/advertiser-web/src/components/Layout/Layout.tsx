import { useAuthStore, useLoginOut } from '@repo/hooks';
import { ViewType } from '../../types';
import Nav from '../Nav/Nav';
import { Footer, SearchBox, UserMenu } from '@repo/ui-components';

interface PageLayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, currentView, onViewChange, onSearch, searchQuery }) => {
  const { user } = useAuthStore();
  const { handleLogout } = useLoginOut();

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 px-4 lg:px-20 py-3 shadow-sm">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="size-9 bg-[#2563eb] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <span className="material-symbols-outlined text-xl">campaign</span>
              </div>
              <h1 className="text-[#1e293b] text-xl font-bold tracking-tight">AdWall</h1>
            </div>
            <Nav currentView={currentView} onViewChange={onViewChange} />
          </div>
          <div className="flex items-center gap-4">
            <SearchBox
              value={searchQuery}
              onChange={onSearch}
              variant="inline"
              placeholder={currentView === 'GALLERY' ? "搜索广告..." : "搜索我的广告..."}
            />

            <UserMenu user={user} onLogout={handleLogout} variant="advertiser" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1920px] w-full mx-auto px-4 lg:px-20 py-10">
        {children}
      </main>

      <Footer className="mt-auto" />
    </div>
  );
};

export default PageLayout;
