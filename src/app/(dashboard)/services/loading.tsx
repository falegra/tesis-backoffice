import { Skeleton } from '@/components/ui/skeleton'

export default function ServicesLoading() {
  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-8 w-36" />
      </header>

      <Skeleton className="h-8 w-56" />

      <div className="bg-background border border-border rounded-xl overflow-hidden">
        <div className="p-2 space-y-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
