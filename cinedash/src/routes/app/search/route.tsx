import { SearchPage } from '#/pages/search'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/search')({
  component: SearchPage,
})
