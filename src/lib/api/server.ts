import { cookies } from 'next/headers'
import type { ApiError } from '@/types/api'

export async function serverFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  const res = await fetch(`${process.env.API_URL}/${path.replace(/^\//, '')}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const error: ApiError = {
      status: res.status,
      message: body.message ?? 'Error del servidor',
      details: body,
    }
    throw error
  }

  return res.json() as Promise<T>
}
