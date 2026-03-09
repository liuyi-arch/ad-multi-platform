import { useHoverSelect } from '@repo/hooks';

interface UserMenuProps {
    user: {
        name?: string;
        role?: string;
        phone?: string;
        avatar?: string;
    } | null;
    onLogout: () => void;
    variant?: 'admin' | 'advertiser';
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout, variant = 'advertiser' }) => {
    const { isOpen, onMouseEnter, onMouseLeave } = useHoverSelect();

    if (variant === 'admin') {
        return (
            <div
                className="relative py-2"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div className="flex items-center gap-6 cursor-pointer">
                    <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-700 leading-none">{user?.name || 'Admin User'}</p>
                            <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">{user?.role || 'Administrator'}</p>
                        </div>
                        <div
                            className="size-9 rounded-full bg-slate-200 ring-2 ring-white ring-offset-2 ring-offset-slate-100 overflow-hidden bg-cover bg-center"
                            style={{ backgroundImage: `url(${user?.avatar || 'https://picsum.photos/seed/admin/100/100'})` }}
                        />
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 border-b border-slate-50">
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">管理员账号</p>
                            <p className="text-sm font-bold text-slate-700 truncate">{user?.phone || '未登录'}</p>
                        </div>
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">logout</span>
                            <span className="font-medium">退出登录</span>
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className="relative py-2"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div
                className="size-10 rounded-full bg-cover bg-center border-2 border-white shadow-md cursor-pointer overflow-hidden bg-slate-100 transition-transform active:scale-95"
            >
                <img src={user?.avatar || "https://picsum.photos/seed/user123/100/100"} alt="Avatar" className="w-full h-full object-cover" />
            </div>

            {isOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-slate-50">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">当前账号</p>
                        <p className="text-sm font-bold text-slate-700 truncate">{user?.phone || '未登录'}</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        <span className="font-medium">退出登录</span>
                    </button>
                </div>
            )}
        </div>
    );
};
