import { MobileSidebar } from './mobile-sidebar'
import { LogoutButton } from './logout-button'

interface HeaderProps {
  username: string
}

export function Header({ username }: HeaderProps) {
  return (
    <header className="h-12 border-b bg-background flex items-center justify-between px-5">
      <MobileSidebar />
      <div className="flex items-center gap-4 ml-auto">
        <span className="text-xs text-muted-foreground">{username}</span>
        <LogoutButton />
      </div>
    </header>
  )
}
