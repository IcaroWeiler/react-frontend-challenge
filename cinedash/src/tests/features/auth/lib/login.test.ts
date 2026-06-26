// @vitest-environment jsdom
import sign from 'jwt-encode'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuthStore } from '#/features/auth/model/store/authStore'
import {
  generateBrowserToken,
  isUserLoggedIn,
  logInUser,
  logOutUser,
} from '#/features/auth/lib/login'
import type { LoginFormData } from '#/features/auth/model/types/form'

const user: LoginFormData = {
  email: 'user@example.com',
  password: 'super-secret',
}

describe('auth login helpers', () => {
  beforeEach(() => {
    localStorage.clear()
    useAuthStore.setState({ token: '' })
    vi.spyOn(console, 'log').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('generates a deterministic jwt token from the credentials', () => {
    const expectedToken = sign(user, 'cinedash-auth-secret', {
      algorithm: 'HS256',
    })

    expect(generateBrowserToken(user)).toBe(expectedToken)
  })

  it('updates the auth store when logging in and out', () => {
    const token = generateBrowserToken(user)

    logInUser(token)

    expect(useAuthStore.getState().token).toBe(token)
    expect(isUserLoggedIn()).toBe(true)

    logOutUser()

    expect(useAuthStore.getState().token).toBe('')
    expect(isUserLoggedIn()).toBe(false)
  })
})
