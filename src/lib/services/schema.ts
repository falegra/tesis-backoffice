import { z } from 'zod'
import { ServiceCategory } from '@/types/services'

export const ServiceCategoryEnum = z.nativeEnum(ServiceCategory)

export const serviceSchema = z.object({
  name: z.string().trim().min(3, 'Mínimo 3 caracteres').max(100, 'Máximo 100 caracteres'),
  category: ServiceCategoryEnum,
  description: z.string().trim().min(20, 'Mínimo 20 caracteres').max(1000, 'Máximo 1000 caracteres'),
  benefits: z
    .array(z.object({ value: z.string().trim().min(3, 'Mínimo 3 caracteres').max(120, 'Máximo 120 caracteres') }))
    .min(1, 'Agregá al menos un beneficio')
    .max(10, 'Máximo 10 beneficios'),
  deliveryTime: z.string().trim().min(2, 'Indicá un plazo').max(50, 'Máximo 50 caracteres'),
  imageUrl: z.string().trim().url('Debe ser una URL válida (incluyendo https://)'),
})

export type ServiceFormValues = z.infer<typeof serviceSchema>

export type ServiceInput = Omit<ServiceFormValues, 'benefits'> & {
  benefits: string[]
}

export function toServiceInput(values: ServiceFormValues): ServiceInput {
  return {
    ...values,
    benefits: values.benefits.map((b) => b.value.trim()).filter(Boolean),
  }
}
