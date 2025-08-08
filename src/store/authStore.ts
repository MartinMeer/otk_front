/**
 * Authentication state management using Zustand
 * TEMPORARILY DISABLED - Backend development in progress
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Temporarily set to always authenticated
      isAuthenticated: true,
      user: {
        id: 'temp-user',
        username: 'Временный пользователь',
        role: 'controller'
      },
      
      // Temporarily disabled login - always returns true
      login: async (username: string, password: string): Promise<boolean> => {
        // TODO: Re-enable when backend is ready
        console.log('Authentication temporarily disabled during backend development');
        return true;
      },
      
      logout: () => {
        // Temporarily disabled - no action
        console.log('Logout temporarily disabled during backend development');
      },
      
      loginDemo: () => {
        // Temporarily disabled - no action needed since always authenticated
        console.log('Demo login temporarily disabled during backend development');
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);