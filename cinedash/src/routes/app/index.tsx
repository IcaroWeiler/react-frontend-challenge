import { useAuthStore } from '#/features/auth/model/store/authStore'
import Footer from '#/shared/Footer'
import Header from '#/shared/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = '/login'
    }
  }, [isLoggedIn])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
