'use client'

import { useTransition } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SERVICE_CATEGORY_OPTIONS } from '@/lib/services/categories'
import type { ServiceCategory } from '@/types/services'

interface ServicesCategoryFilterProps {
  current?: ServiceCategory
}

export function ServicesCategoryFilter({ current }: ServicesCategoryFilterProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [, startTransition] = useTransition()

  function handleChange(value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (!value || value === '__all__') {
      params.delete('category')
    } else {
      params.set('category', value)
    }
    params.set('page', '1')
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <Select value={current ?? '__all__'} onValueChange={handleChange}>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Filtrar por categoría" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__all__">Todas</SelectItem>
        {SERVICE_CATEGORY_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
