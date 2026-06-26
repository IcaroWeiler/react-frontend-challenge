import { DiscoveryPage } from '#/pages/discovery'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/discovery')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DiscoveryPage />
}
