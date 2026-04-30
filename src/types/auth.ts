export interface AuthTokenPayload {
  sub: string
  username: string
  iat: number
  exp: number
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
}
