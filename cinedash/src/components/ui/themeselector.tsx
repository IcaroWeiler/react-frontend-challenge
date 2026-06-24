import { useThemeStore, type ThemeStore } from '#/app/theme/store/themeStore'
import { Moon, Sun } from 'lucide-react'
import { Button } from './button'

export const ThemeSelector = () => {
  const theme = useThemeStore((state: ThemeStore) => state)

  return (
    <Button onClick={() => theme.toggleTheme()} className="p-2">
      {theme.theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  )
}
