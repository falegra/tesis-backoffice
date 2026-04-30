import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { parseToken } from '@/lib/auth/tokens'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  if (!accessToken) redirect('/login')

  let username = 'Usuario'
  try {
    username = parseToken(accessToken).username
  } catch {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header username={username} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
