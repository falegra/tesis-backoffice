import ky from 'ky'

let refreshPromise: Promise<Response> | null = null

export const apiClient = ky.create({
  prefix: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  hooks: {
    afterResponse: [
      async ({ request, options, response }) => {
        if (response.status !== 401) return response
        if (request.url.includes('/api/auth/')) return response

        if (!refreshPromise) {
          refreshPromise = fetch('/api/auth/refresh', { method: 'POST' }).finally(() => {
            refreshPromise = null
          })
        }

        const refreshRes = await refreshPromise
        if (!refreshRes.ok) {
          window.location.href = '/login'
          return response
        }

        return ky(request, options)
      },
    ],
  },
})
