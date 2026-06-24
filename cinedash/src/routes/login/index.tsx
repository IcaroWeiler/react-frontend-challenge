import { useAuthStore } from '#/features/auth/model/store/authStore'
import { Login } from '#/pages/login'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/app'
    }
  }, [isLoggedIn])

  return <Login></Login>
}
