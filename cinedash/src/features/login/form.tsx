import { Button } from '#/shared/components/ui/button'
import { Input } from '#/shared/components/ui/input'
import { ThemeSelector } from '#/shared/components/ui/themeselector'

export function LoginForm() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center p-4">
      <Input type="text" placeholder="Email" />
      <Input type="password" placeholder="Senha" />

      <div className="flex gap-2 mt-3 items-center justify-center">
        <Button onClick={() => {}} className="p-2">
          Entrar
        </Button>
        <ThemeSelector />
      </div>
    </div>
  )
}
