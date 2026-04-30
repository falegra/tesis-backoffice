import { Skeleton } from '@/components/ui/skeleton'

export default function EditServiceLoading() {
  return (
    <div className="space-y-6">
      <header>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64 mt-2" />
      </header>

      <div className="bg-background border border-border rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-24 w-full md:col-span-2" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-24 w-full md:col-span-2" />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
    </div>
  )
}
