import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthStore } from '../types/store'

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: '',
      login: (token: string) => {
        set({ token })
      },
      logout: () => {
        set({ token: '' })
      },
    }),
    {
      name: 'userLoginStatus',
    },
  ),
)
