import Footer from '#/shared/Footer'
import Header from '#/shared/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  useEffect(() => {
    // const token = localStorage.getItem('token')
    // if (!token) {
    //   window.location.href = '/login'
    // }
  }, [])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
