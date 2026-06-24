export interface AuthStore {
  token: string
  isLoggedIn: boolean
  login: (token: string) => void
  logout: () => void
}
