import { Button } from '#/shared/components/ui/button'
import { useAuthStore } from '../model/store/authStore'

export const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout)

  return (
    <Button onClick={logout} className="text-sm">
      Sair
    </Button>
  )
}
