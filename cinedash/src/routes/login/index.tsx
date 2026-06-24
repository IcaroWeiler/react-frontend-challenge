import { useAuthStore } from '#/features/auth/model/store/authStore'
import { Login } from '#/pages/login'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    if (token) {
      window.location.href = '/app'
    }
  }, [token])

  return <Login></Login>
}
