/**
 * Authentication state management using Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      
      login: async (username: string, password: string): Promise<boolean> => {
        // Demo credentials validation
        if (username === 'controller' && password === 'demo123') {
          const user: User = {
            id: '1',
            username: 'controller',
            role: 'controller'
          };
          set({ isAuthenticated: true, user });
          return true;
        }
        if (username === 'admin' && password === 'admin123') {
          const user: User = {
            id: '2',
            username: 'admin',
            role: 'admin'
          };
          set({ isAuthenticated: true, user });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
      
      loginDemo: () => {
        const user: User = {
          id: 'demo',
          username: 'Демо пользователь',
          role: 'controller'
        };
        set({ isAuthenticated: true, user });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);