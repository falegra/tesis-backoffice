import { ServiceCategory } from '@/types/services'

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  [ServiceCategory.DESARROLLO_WEB]: 'Desarrollo Web',
  [ServiceCategory.DESARROLLO_MOVIL]: 'Desarrollo Móvil',
  [ServiceCategory.DISENO_UX_UI]: 'Diseño UX/UI',
  [ServiceCategory.MARKETING_DIGITAL]: 'Marketing Digital',
  [ServiceCategory.CONSULTORIA_IT]: 'Consultoría IT',
  [ServiceCategory.CLOUD_DEVOPS]: 'Cloud / DevOps',
  [ServiceCategory.SOPORTE_MANTENIMIENTO]: 'Soporte y Mantenimiento',
}

export const SERVICE_CATEGORY_OPTIONS = (
  Object.keys(SERVICE_CATEGORY_LABELS) as ServiceCategory[]
).map((value) => ({ value, label: SERVICE_CATEGORY_LABELS[value] }))

export function getCategoryLabel(category: ServiceCategory): string {
  return SERVICE_CATEGORY_LABELS[category] ?? category
}
