import { isUserLoggedIn } from '#/features/auth/lib/login'
import { useAuthStore } from '#/features/auth/model/store/authStore'
import Footer from '#/shared/Footer'
import Header from '#/shared/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  const token = useAuthStore((state) => state.token)

  const loggedIn = isUserLoggedIn()
  useEffect(() => {
    if (!loggedIn) {
      window.location.href = '/login'
    }
  }, [token, loggedIn])

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
