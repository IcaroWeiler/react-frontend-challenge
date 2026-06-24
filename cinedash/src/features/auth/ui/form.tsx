import { ThemeSelector } from '#/app/theme/ui/themeselector'
import { Button } from '#/shared/components/ui/button'
import { Input } from '#/shared/components/ui/input'
import { useState } from 'react'
import { generateBrowserToken, logInUser } from '../lib/login'
import type { LoginFormData } from '../model/types/form'

export function LoginForm() {
  const [formState, setFormState] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleLogin = () => {
    const token = generateBrowserToken(formState)
    logInUser(token)
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center p-4">
      <Input
        type="text"
        placeholder="Email"
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={formState.password}
        onChange={(e) =>
          setFormState({ ...formState, password: e.target.value })
        }
      />

      <div className="flex gap-2 mt-3 items-center justify-center">
        <Button onClick={handleLogin} className="p-2">
          Entrar
        </Button>
        <ThemeSelector />
      </div>
    </div>
  )
}
