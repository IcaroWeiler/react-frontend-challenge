import { MovieDetailPage } from '#/pages/detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/movie/$movieId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { movieId } = Route.useParams()

  return <MovieDetailPage movieId={Number(movieId)} />
}
