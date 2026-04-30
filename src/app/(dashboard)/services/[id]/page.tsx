import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getService } from '@/lib/services/api'
import { ServiceCategoryBadge } from '../_components/service-category-badge'
import { DeleteServiceButton } from '../_components/delete-service-button'

interface ServiceDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { id } = await params

  let service
  try {
    service = await getService(id)
  } catch (err: unknown) {
    const e = err as { status?: number }
    if (e?.status === 404) notFound()
    throw err
  }

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <ServiceCategoryBadge category={service.category} />
          <h1 className="text-2xl font-bold">{service.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button render={<Link href={`/services/${id}/edit`} />} nativeButton={false}>
            Editar
          </Button>
          <DeleteServiceButton
            id={service.id}
            name={service.name}
            projectCount={service.projectCount}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-background border border-border rounded-xl p-6 space-y-3">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              Descripción
            </h2>
            <p className="text-sm leading-relaxed">{service.description}</p>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 space-y-3">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              Beneficios
            </h2>
            <ul className="space-y-1.5">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-primary">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {service.imageUrl && (
            <div className="bg-background border border-border rounded-xl overflow-hidden">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full aspect-video object-cover"
              />
            </div>
          )}

          <div className="bg-background border border-border rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Plazo de entrega</span>
              <span className="font-medium">{service.deliveryTime}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Proyectos</span>
              <span className="font-medium">{service.projectCount}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Creado</span>
              <span className="font-medium">
                {new Date(service.createdAt).toLocaleDateString('es-AR')}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Actualizado</span>
              <span className="font-medium">
                {new Date(service.updatedAt).toLocaleDateString('es-AR')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
