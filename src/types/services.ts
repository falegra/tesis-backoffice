export enum ServiceCategory {
  DESARROLLO_WEB = 'DESARROLLO_WEB',
  DESARROLLO_MOVIL = 'DESARROLLO_MOVIL',
  DISENO_UX_UI = 'DISENO_UX_UI',
  MARKETING_DIGITAL = 'MARKETING_DIGITAL',
  CONSULTORIA_IT = 'CONSULTORIA_IT',
  CLOUD_DEVOPS = 'CLOUD_DEVOPS',
  SOPORTE_MANTENIMIENTO = 'SOPORTE_MANTENIMIENTO',
}

export interface ServiceResponse {
  id: string
  name: string
  category: ServiceCategory
  description: string
  benefits: string[]
  deliveryTime: string
  imageUrl: string
  projectCount: number
  createdAt: string
  updatedAt: string
}

export interface PaginatedServicesResponse {
  data: ServiceResponse[]
  total: number
  page: number
  limit: number
}

export interface ListServicesParams {
  page?: number
  limit?: number
  category?: ServiceCategory
}
