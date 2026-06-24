import { useThemeStore, type ThemeStore } from '#/app/theme/store/themeStore'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'

export function LoginForm() {
  const theme = useThemeStore((state: ThemeStore) => state)

  return (
    <div className="flex flex-col gap-2 items-center justify-center p-4">
      <Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      <Button onClick={() => {}} className="p-2">
        Login
      </Button>
      <Button onClick={() => theme.toggleTheme()} className="p-2">
        Swap Theme
      </Button>
    </div>
  )
}
