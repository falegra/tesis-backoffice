import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ServiceForm } from '../_components/service-form'

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Nuevo servicio</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Completá los datos para crear un nuevo servicio.
          </p>
        </div>
      </header>

      <div className="bg-background border border-border rounded-xl p-6">
        <ServiceForm mode="create" />
      </div>
    </div>
  )
}
