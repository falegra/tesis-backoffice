import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getServices } from '@/lib/services/api'
import { ServiceCategoryEnum } from '@/lib/services/schema'
import type { ServiceCategory } from '@/types/services'
import { ServicesTable } from './_components/services-table'
import { ServicesTablePagination } from './_components/services-table-pagination'
import { ServicesCategoryFilter } from './_components/services-category-filter'

interface ServicesPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    category?: string
  }>
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const sp = await searchParams

  const rawPage = Number(sp.page ?? '1')
  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage

  const rawLimit = Number(sp.limit ?? '10')
  const limit = isNaN(rawLimit) || rawLimit < 1 || rawLimit > 100 ? 10 : rawLimit

  const categoryParsed = ServiceCategoryEnum.safeParse(sp.category)
  const category = categoryParsed.success ? categoryParsed.data : undefined

  const result = await getServices({ page, limit, category })

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Servicios</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {result.total} servicio{result.total !== 1 ? 's' : ''} en total
          </p>
        </div>
        <Button render={<Link href="/services/new" />} nativeButton={false}>
          Nuevo servicio
        </Button>
      </header>

      <ServicesCategoryFilter current={category as ServiceCategory | undefined} />

      <div className="bg-background border border-border rounded-xl overflow-hidden">
        <ServicesTable services={result.data} />
      </div>

      {result.total > result.limit && (
        <ServicesTablePagination
          page={result.page}
          limit={result.limit}
          total={result.total}
        />
      )}
    </div>
  )
}
