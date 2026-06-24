import { useEffect } from 'react'
import { useThemeStore, type ThemeStore } from '../store/themeStore'
import { applyTheme } from '../helpers/themeHelper'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state: ThemeStore) => state.theme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return children
}
