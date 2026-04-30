'use client'

import { useLogout } from '@/hooks/use-logout'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
  const logout = useLogout()
  return (
    <Button variant="ghost" size="sm" onClick={logout} className="h-7 text-xs text-muted-foreground hover:text-foreground">
      Salir
    </Button>
  )
}
