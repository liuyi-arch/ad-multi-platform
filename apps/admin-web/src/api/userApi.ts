
import { User } from '../types';

/**
 * 模拟获取用户列表
 */
export const fetchUsers = async (): Promise<User[]> => {
  return [
    { name: 'Alex Rivera', role: '超级管理员', email: 'alex@adwall.com', status: '在线' },
    { name: 'Jordan Smith', role: '运营专员', email: 'jordan@adwall.com', status: '离线' },
    { name: 'Sarah Lee', role: '内容审核员', email: 'sarah@adwall.com', status: '在线' }
  ];
};
