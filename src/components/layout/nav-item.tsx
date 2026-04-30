'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { NavItem as NavItemType } from '@/types/api'

export function NavItem({ item }: { item: NavItemType }) {
  const pathname = usePathname()
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

  return (
    <Link
      href={item.href}
      className={cn(
        'block px-2 py-1.5 rounded-md text-sm transition-colors',
        isActive
          ? 'bg-muted text-foreground font-medium'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
      )}
    >
      {item.label}
    </Link>
  )
}
