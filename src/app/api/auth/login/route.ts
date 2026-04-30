import { NextResponse, type NextRequest } from 'next/server'
import { setAuthCookies } from '@/lib/auth/cookies'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const upstream = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!upstream.ok) {
    const error = await upstream.json().catch(() => ({ message: 'Error al iniciar sesión' }))
    return NextResponse.json(error, { status: upstream.status })
  }

  const { accessToken, refreshToken } = await upstream.json()
  const res = NextResponse.json({ ok: true })
  setAuthCookies(res, accessToken, refreshToken)
  return res
}
