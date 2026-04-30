'use client'

import { useState, useTransition } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { serviceSchema, type ServiceFormValues } from '@/lib/services/schema'
import { SERVICE_CATEGORY_OPTIONS } from '@/lib/services/categories'
import { ServiceCategory } from '@/types/services'
import { createService, updateService } from '../_actions'
import { BenefitsField } from './benefits-field'

interface ServiceFormProps {
  mode: 'create' | 'edit'
  initialValues?: ServiceFormValues
  serviceId?: string
}

export function ServiceForm({ mode, initialValues, serviceId }: ServiceFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<ServiceFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(serviceSchema as any),
    mode: 'onBlur',
    defaultValues: initialValues ?? {
      name: '',
      category: ServiceCategory.DESARROLLO_WEB,
      description: '',
      benefits: [{ value: '' }],
      deliveryTime: '',
      imageUrl: '',
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form

  const imageUrl = watch('imageUrl')
  const categoryValue = watch('category')

  function onSubmit(values: ServiceFormValues) {
    setServerError(null)
    startTransition(async () => {
      const result =
        mode === 'create'
          ? await createService(values)
          : await updateService(serviceId!, values)

      if (!result.ok) {
        if (result.code === 'UNAUTHENTICATED') {
          router.push('/login')
          return
        }
        if (result.code === 'VALIDATION' && result.fieldErrors) {
          for (const [field, messages] of Object.entries(result.fieldErrors)) {
            form.setError(field as keyof ServiceFormValues, {
              message: messages[0],
            })
          }
        }
        toast.error(result.message)
        setServerError(result.message)
        return
      }

      toast.success(
        mode === 'create' ? 'Servicio creado correctamente' : 'Servicio actualizado correctamente'
      )
      router.push(mode === 'create' ? '/services' : `/services/${result.data.id}`)
    })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {serverError && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {serverError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Name */}
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Nombre del servicio"
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="category">Categoría</Label>
            <Select
              value={categoryValue}
              onValueChange={(val) => setValue('category', val as ServiceCategory, { shouldValidate: true })}
            >
              <SelectTrigger id="category" className="w-full" aria-invalid={!!errors.category}>
                <SelectValue placeholder="Seleccioná una categoría" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-destructive">{errors.category.message}</p>
            )}
          </div>

          {/* Description — full width */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Descripción del servicio"
              rows={4}
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* Delivery time */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="deliveryTime">Plazo de entrega</Label>
            <Input
              id="deliveryTime"
              {...register('deliveryTime')}
              placeholder="Ej: 2-4 semanas"
              aria-invalid={!!errors.deliveryTime}
            />
            {errors.deliveryTime && (
              <p className="text-xs text-destructive">{errors.deliveryTime.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="imageUrl">URL de imagen</Label>
            <Input
              id="imageUrl"
              {...register('imageUrl')}
              placeholder="https://..."
              aria-invalid={!!errors.imageUrl}
            />
            {errors.imageUrl && (
              <p className="text-xs text-destructive">{errors.imageUrl.message}</p>
            )}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Vista previa"
                className="mt-2 h-20 w-20 object-cover rounded border"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0.3'
                }}
              />
            )}
          </div>

          {/* Benefits — full width */}
          <div className="md:col-span-2">
            <BenefitsField />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="ghost"
            render={<Link href="/services" />}
            nativeButton={false}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? mode === 'create'
                ? 'Creando...'
                : 'Guardando...'
              : mode === 'create'
                ? 'Crear servicio'
                : 'Guardar cambios'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
