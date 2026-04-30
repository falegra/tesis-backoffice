import { Badge } from '@/components/ui/badge'
import { getCategoryLabel } from '@/lib/services/categories'
import type { ServiceCategory } from '@/types/services'

interface ServiceCategoryBadgeProps {
  category: ServiceCategory
}

export function ServiceCategoryBadge({ category }: ServiceCategoryBadgeProps) {
  return (
    <Badge variant="secondary">
      {getCategoryLabel(category)}
    </Badge>
  )
}
