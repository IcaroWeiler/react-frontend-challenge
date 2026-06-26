import { Button } from '#/shared/components/ui/button'
import { useNavigate } from '@tanstack/react-router'

export function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[calc(100vh-135px)] items-center justify-center p-4">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Button
          onClick={() => navigate({ to: '/app/discovery' })}
          className="text-sm"
        >
          Ir para Discovery
        </Button>

        <Button
          onClick={() => navigate({ to: '/app/watchlist' })}
          className="text-sm"
        >
          Ir para Watchlist
        </Button>

        <Button onClick={() => navigate({ to: '/login' })} className="text-sm">
          Ir para Login
        </Button>
      </div>
    </div>
  )
}
