import { useThemeStore, type ThemeStore } from '#/app/theme/store/themeStore'
import { Button } from '#/shared/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export const ThemeSelector = () => {
  const theme = useThemeStore((state: ThemeStore) => state)

  return (
    <Button onClick={() => theme.toggleTheme()} className="p-2">
      {theme.theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  )
}
