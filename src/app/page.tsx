import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  const cookieStore = await cookies()
  const hasToken = cookieStore.has('access_token') || cookieStore.has('refresh_token')
  redirect(hasToken ? '/services' : '/login')
}
