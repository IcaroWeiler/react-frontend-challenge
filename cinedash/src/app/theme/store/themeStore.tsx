import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Theme {
  theme: 'light' | 'dark'
}

export const useThemeStore = create()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state: Theme) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme',
    },
  ),
)
