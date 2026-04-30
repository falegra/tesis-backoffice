import { NAV_GROUPS } from './nav-config'
import { NavItem } from './nav-item'

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-56 min-h-screen border-r bg-background px-3 py-8">
      <div className="mb-8 px-2">
        <span className="text-sm font-semibold tracking-tight">Panel Admin</span>
      </div>
      <nav className="flex flex-col gap-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-2 mb-1 text-[10px] font-medium text-muted-foreground/60 uppercase tracking-widest">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
