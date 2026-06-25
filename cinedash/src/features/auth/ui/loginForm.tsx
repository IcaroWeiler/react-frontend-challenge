import { ThemeSelector } from '#/app/theme/ui/themeselector'
import { Button } from '#/shared/components/ui/button'
import { Input } from '#/shared/components/ui/input'
import { useState } from 'react'
import { generateBrowserToken, logInUser } from '../lib/login'
import type { LoginFormData } from '../model/types/form'
import { loginSchema } from '../model/schema/loginForm'

export function LoginForm() {
  const [formState, setFormState] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({})

  const handleLogin = () => {
    const result = loginSchema.safeParse(formState)

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors

      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      })
      return
    }

    setErrors({})

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

      {errors.email && (
        <span className="text-sm text-red-500">{errors.email}</span>
      )}

      <Input
        type="password"
        placeholder="Password"
        value={formState.password}
        onChange={(e) =>
          setFormState({ ...formState, password: e.target.value })
        }
      />

      {errors.password && (
        <span className="text-sm text-red-500">{errors.password}</span>
      )}

      <div className="flex gap-2 mt-3 items-center justify-center">
        <Button onClick={handleLogin} className="p-2">
          Login
        </Button>
        <ThemeSelector />
      </div>
    </div>
  )
}
