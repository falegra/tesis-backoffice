'use server'

import { revalidatePath } from 'next/cache'
import { serverFetch } from '@/lib/api/server'
import { serviceSchema, toServiceInput, type ServiceFormValues } from '@/lib/services/schema'
import type { ServiceResponse } from '@/types/services'

export type ActionErrorCode = 'VALIDATION' | 'UNAUTHENTICATED' | 'CONFLICT' | 'NOT_FOUND' | 'UNKNOWN'

export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; code: ActionErrorCode; message: string; fieldErrors?: Record<string, string[]> }

function mapError(err: unknown): ActionResult<never> {
  if (typeof err === 'object' && err !== null && 'status' in err) {
    const e = err as { status: number; message?: string }
    if (e.status === 401) return { ok: false, code: 'UNAUTHENTICATED', message: 'Tu sesión expiró. Iniciá sesión nuevamente.' }
    if (e.status === 404) return { ok: false, code: 'NOT_FOUND', message: 'El servicio no existe.' }
    if (e.status === 409) return { ok: false, code: 'CONFLICT', message: 'No se puede eliminar: hay proyectos asociados.' }
    return { ok: false, code: 'UNKNOWN', message: (e.message as string) ?? 'Error del servidor.' }
  }
  return { ok: false, code: 'UNKNOWN', message: 'Error inesperado.' }
}

export async function createService(raw: ServiceFormValues): Promise<ActionResult<{ id: string }>> {
  const parsed = serviceSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      ok: false,
      code: 'VALIDATION',
      message: 'Revisá los campos marcados.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }
  try {
    const created = await serverFetch<ServiceResponse>('services', {
      method: 'POST',
      body: JSON.stringify(toServiceInput(parsed.data)),
    })
    revalidatePath('/services')
    return { ok: true, data: { id: created.id } }
  } catch (err) {
    return mapError(err)
  }
}

export async function updateService(id: string, raw: ServiceFormValues): Promise<ActionResult<{ id: string }>> {
  const parsed = serviceSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      ok: false,
      code: 'VALIDATION',
      message: 'Revisá los campos marcados.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }
  try {
    const updated = await serverFetch<ServiceResponse>(`services/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(toServiceInput(parsed.data)),
    })
    revalidatePath('/services')
    revalidatePath(`/services/${id}`)
    return { ok: true, data: { id: updated.id } }
  } catch (err) {
    return mapError(err)
  }
}

export async function deleteService(id: string): Promise<ActionResult<void>> {
  try {
    await serverFetch<void>(`services/${id}`, { method: 'DELETE' })
    revalidatePath('/services')
    return { ok: true, data: undefined }
  } catch (err) {
    return mapError(err)
  }
}
