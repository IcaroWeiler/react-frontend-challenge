import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  useEffect(() => {
    window.location.href = '/login'
  }, [])

  return <Outlet />
}
