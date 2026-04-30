import { notFound } from 'next/navigation'
import { getService } from '@/lib/services/api'
import type { ServiceFormValues } from '@/lib/services/schema'
import { ServiceForm } from '../../_components/service-form'

interface EditServicePageProps {
  params: Promise<{ id: string }>
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params

  let service
  try {
    service = await getService(id)
  } catch (err: unknown) {
    const e = err as { status?: number }
    if (e?.status === 404) notFound()
    throw err
  }

  const initialValues: ServiceFormValues = {
    name: service.name,
    category: service.category,
    description: service.description,
    benefits: service.benefits.map((v) => ({ value: v })),
    deliveryTime: service.deliveryTime,
    imageUrl: service.imageUrl,
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Editar servicio</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Modificá los datos de <strong>{service.name}</strong>.
        </p>
      </header>

      <div className="bg-background border border-border rounded-xl p-6">
        <ServiceForm mode="edit" serviceId={id} initialValues={initialValues} />
      </div>
    </div>
  )
}
