
import React from 'react';

const AccessControlPage: React.FC = () => {
  const users = [
    { name: 'Alex Rivera', role: '超级管理员', email: 'alex@adwall.com', status: '在线' },
    { name: 'Jordan Smith', role: '运营专员', email: 'jordan@adwall.com', status: '离线' },
    { name: 'Sarah Lee', role: '内容审核员', email: 'sarah@adwall.com', status: '在线' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-text-main">访问控制</h2>
          <p className="text-sm text-text-muted">管理团队成员及其系统访问权限</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">person_add</span>
          添加成员
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border-light shadow-soft overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-text-muted text-[10px] font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">成员</th>
              <th className="px-6 py-4">角色</th>
              <th className="px-6 py-4">邮箱</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {users.map((user, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-slate-200"></div>
                    <span className="text-sm font-bold text-text-main">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-muted">{user.role}</td>
                <td className="px-6 py-4 text-sm text-text-muted">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${user.status === '在线' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    <span className={`size-1.5 rounded-full ${user.status === '在线' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary text-xs font-bold hover:underline">编辑权限</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccessControlPage;
