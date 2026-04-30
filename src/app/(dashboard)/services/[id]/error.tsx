'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ServiceDetailErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ServiceDetailError({ error, reset }: ServiceDetailErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <p className="font-medium text-destructive">Error al cargar el servicio</p>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={reset}>
          Reintentar
        </Button>
        <Button variant="ghost" render={<Link href="/services" />} nativeButton={false}>
          Volver al listado
        </Button>
      </div>
    </div>
  )
}
