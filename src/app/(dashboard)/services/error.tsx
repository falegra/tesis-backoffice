'use client'

import { Button } from '@/components/ui/button'

interface ServicesErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ServicesError({ error, reset }: ServicesErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <p className="font-medium text-destructive">Error al cargar los servicios</p>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <Button variant="outline" onClick={reset}>
        Reintentar
      </Button>
    </div>
  )
}
