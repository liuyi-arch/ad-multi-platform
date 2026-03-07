import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@repo/api';
import { AuthRole, AuthMode, AuthFormData } from '@repo/shared-types';
import { validateAuthForm } from '@repo/utils';

export type UserRole = 'ADVERTISER' | 'ADMIN';

export interface User {
  phone: string;
  role: UserRole;
  username?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  role: AuthRole;
  mode: AuthMode;
  isAuthenticated: boolean;
  loading: boolean;
  showPassword: boolean;
  formData: AuthFormData;
  
  // Actions
  setRole: (role: AuthRole) => void;
  setMode: (mode: AuthMode) => void;
  togglePasswordVisibility: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent, options?: {
    onSuccess?: (role: AuthRole, mode: AuthMode) => void;
    onNotify?: (msg: string, type: any) => void;
  }) => Promise<void>;
  login: (user: User, token: string) => void;
  logout: () => void;
  switchMode: (mode: AuthMode) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      role: 'ADVERTISER',
      mode: 'LOGIN',
      isAuthenticated: false,
      loading: false,
      showPassword: false,
      formData: { phone: '', password: '', confirmPassword: '' },

      setRole: (role) => set({ 
        role, 
        formData: { phone: '', password: '', confirmPassword: '' } 
      }),
      setMode: (mode) => set({ mode }),
      togglePasswordVisibility: () => set((state) => ({ showPassword: !state.showPassword })),
      handleInputChange: (e) => {
        const { name, value } = e.target;
        set((state) => ({
          formData: { ...state.formData, [name]: value }
        }));
      },
      handleSubmit: async (e, options) => {
        e.preventDefault();
        const { formData, mode, role } = get();
        
        const errorMsg = validateAuthForm(formData, mode);
        if (errorMsg) {
          options?.onNotify?.(errorMsg, 'error');
          return;
        }

        set({ loading: true });
        try {
          const data = { phone: formData.phone, password: formData.password, role };
          const result = mode === 'LOGIN'
            ? await authService.login(data)
            : await authService.register(data);

          if (result.token) {
            const user = { phone: formData.phone, role: role as UserRole };
            get().login(user, result.token);
          }

          options?.onNotify?.(`${mode === 'LOGIN' ? '登录' : '注册'}成功`, 'success');
          options?.onSuccess?.(role, mode);
        } catch (error: any) {
          const msg = error.response?.data?.message || '服务器响应异常，请稍后重试';
          options?.onNotify?.(msg, 'error');
        } finally {
          set({ loading: false });
        }
      },
      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
        localStorage.setItem('auth_token', token);
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('auth_token');
      },
      switchMode: (mode) => set({ 
        mode, 
        formData: { phone: '', password: '', confirmPassword: '' } 
      }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        role: state.role,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
