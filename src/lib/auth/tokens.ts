import { decodeJwt } from 'jose'
import type { AuthTokenPayload } from '@/types/auth'

export function parseToken(token: string): AuthTokenPayload {
  return decodeJwt(token) as AuthTokenPayload
}

export function isExpired(token: string): boolean {
  try {
    const { exp } = parseToken(token)
    return exp * 1000 < Date.now()
  } catch {
    return true
  }
}
