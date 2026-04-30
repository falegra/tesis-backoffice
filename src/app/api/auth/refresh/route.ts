import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { setAuthCookies, clearAuthCookies } from '@/lib/auth/cookies'

export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refresh_token')?.value

  if (!refreshToken) {
    return NextResponse.json({ error: 'no_refresh' }, { status: 401 })
  }

  const upstream = await fetch(`${process.env.API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })

  if (!upstream.ok) {
    const res = NextResponse.json({ error: 'refresh_failed' }, { status: 401 })
    clearAuthCookies(res)
    return res
  }

  const { accessToken, refreshToken: newRefreshToken } = await upstream.json()
  const res = NextResponse.json({ ok: true })
  setAuthCookies(res, accessToken, newRefreshToken)
  return res
}
