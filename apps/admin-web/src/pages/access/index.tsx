import React, { useState } from 'react';
import Layout from '../../components/Layout';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  lastActive: string;
}

const AccessControlPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const users: User[] = [
    { id: '1', name: '张管理', email: 'admin@example.com', role: 'admin', lastActive: '2小时前' },
    { id: '2', name: '李编辑', email: 'editor@example.com', role: 'editor', lastActive: '5小时前' },
    { id: '3', name: '王观察', email: 'viewer@example.com', role: 'viewer', lastActive: '1天前' },
  ];

  return (
    <Layout
      title="访问控制"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      currentNav="access"
      onNavChange={() => { }}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-text-muted">管理团队成员及其访问权限</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-hover transition-colors">
            <span className="material-symbols-outlined text-lg">person_add</span>
            邀请成员
          </button>
        </div>

        <div className="bg-surface rounded-xl border border-border-light shadow-soft overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-border-light">
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">成员</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">角色权限</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">最后活跃</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-main">{user.name}</p>
                        <p className="text-xs text-text-muted">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${user.role === 'admin' ? 'bg-amber-100 text-amber-700' :
                        user.role === 'editor' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">{user.lastActive}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-text-muted hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">settings</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AccessControlPage;
