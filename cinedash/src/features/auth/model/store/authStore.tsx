import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthStore } from '../types/store'

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: '',
      isLoggedIn: !!localStorage.getItem('userLoginStatus.token'),
      login: (token: string) => {
        set({ isLoggedIn: true, token })
      },
      logout: () => {
        set({ isLoggedIn: false, token: '' })
      },
    }),
    {
      name: 'userLoginStatus',
    },
  ),
)
