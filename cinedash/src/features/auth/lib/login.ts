import { useAuthStore } from '../model/store/authStore'
import type { LoginFormData } from '../model/types/form'
import sign from 'jwt-encode'

export function generateBrowserToken(user: LoginFormData) {
  const secret = 'cinedash-auth-secret' // ISSO NÃO DEVERIA ESTAR EXPOSTO, MAS COMO NÃO TEREMOS BACK USAREI AQUI
  const token = sign(user, secret, { algorithm: 'HS256' })
  console.log('Token gerado:', token)
  return token
}

export function logInUser(token: string) {
  const authStore = useAuthStore.getState()
  authStore.login(token)
}

export function logOutUser() {
  const authStore = useAuthStore.getState()
  authStore.logout()
}
