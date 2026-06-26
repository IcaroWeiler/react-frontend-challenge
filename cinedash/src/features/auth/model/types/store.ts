export interface AuthStore {
  token: string
  login: (token: string) => void
  logout: () => void
}
