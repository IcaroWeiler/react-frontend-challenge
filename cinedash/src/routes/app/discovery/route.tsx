import { useAuthStore } from '#/features/auth/model/store/authStore'
import Footer from '#/shared/Footer'
import Header from '#/shared/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/app/discovery')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="flex flex-col">discovery</div>
    </>
  )
}
