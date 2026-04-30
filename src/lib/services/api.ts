import 'server-only'
import { serverFetch } from '@/lib/api/server'
import type { ListServicesParams, PaginatedServicesResponse, ServiceResponse } from '@/types/services'

function buildQuery(params: ListServicesParams = {}): string {
  const sp = new URLSearchParams()
  sp.set('page', String(params.page ?? 1))
  sp.set('limit', String(params.limit ?? 10))
  if (params.category) sp.set('category', params.category)
  return sp.toString()
}

export async function getServices(params: ListServicesParams = {}): Promise<PaginatedServicesResponse> {
  return serverFetch<PaginatedServicesResponse>(`services?${buildQuery(params)}`)
}

export async function getService(id: string): Promise<ServiceResponse> {
  return serverFetch<ServiceResponse>(`services/${id}`)
}
