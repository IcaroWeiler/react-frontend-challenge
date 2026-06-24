import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthStore } from '../types/store'

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: '',
      setToken: (token) =>
        set(() => ({
          token,
        })),
    }),
    {
      name: 'token',
    },
  ),
)
