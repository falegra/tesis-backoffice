'use client'

import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface ServicesTablePaginationProps {
  page: number
  limit: number
  total: number
}

export function ServicesTablePagination({ page, limit, total }: ServicesTablePaginationProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const totalPages = Math.max(1, Math.ceil(total / limit))

  function buildHref(targetPage: number): string {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(targetPage))
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-between px-2">
      <p className="text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          render={page <= 1 ? undefined : <Link href={buildHref(page - 1)} />}
          nativeButton={false}
          disabled={page <= 1}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          render={page >= totalPages ? undefined : <Link href={buildHref(page + 1)} />}
          nativeButton={false}
          disabled={page >= totalPages}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
