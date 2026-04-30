'use client'

import { useFieldArray, useFormContext } from 'react-hook-form'
import { Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ServiceFormValues } from '@/lib/services/schema'

export function BenefitsField() {
  const { control, register, formState: { errors } } = useFormContext<ServiceFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: 'benefits' })

  return (
    <div className="flex flex-col gap-2">
      <Label>Beneficios</Label>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2">
            <div className="flex-1 flex flex-col gap-1">
              <Input
                {...register(`benefits.${index}.value`)}
                placeholder={`Beneficio ${index + 1}`}
                aria-invalid={!!errors.benefits?.[index]?.value}
              />
              {errors.benefits?.[index]?.value && (
                <p className="text-xs text-destructive">
                  {errors.benefits[index].value.message}
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              title="Eliminar beneficio"
            >
              <Trash2 />
              <span className="sr-only">Eliminar</span>
            </Button>
          </div>
        ))}
      </div>

      {errors.benefits && typeof errors.benefits.message === 'string' && (
        <p className="text-xs text-destructive">{errors.benefits.message}</p>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ value: '' })}
        disabled={fields.length >= 10}
        className="self-start"
      >
        <Plus />
        Agregar beneficio
      </Button>
    </div>
  )
}
