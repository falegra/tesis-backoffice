import Link from 'next/link'
import { Eye, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { ServiceResponse } from '@/types/services'
import { ServiceCategoryBadge } from './service-category-badge'
import { DeleteServiceButton } from './delete-service-button'
import { EmptyState } from './empty-state'

interface ServicesTableProps {
  services: ServiceResponse[]
}

export function ServicesTable({ services }: ServicesTableProps) {
  if (services.length === 0) {
    return (
      <EmptyState
        title="Sin servicios"
        description="No hay servicios registrados todavía."
      />
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Plazo de entrega</TableHead>
          <TableHead>Proyectos</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell>
              <img
                src={service.imageUrl}
                alt={service.name}
                width={32}
                height={32}
                className="rounded object-cover size-8"
              />
            </TableCell>
            <TableCell className="font-medium">{service.name}</TableCell>
            <TableCell>
              <ServiceCategoryBadge category={service.category} />
            </TableCell>
            <TableCell>{service.deliveryTime}</TableCell>
            <TableCell>{service.projectCount}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  render={<Link href={`/services/${service.id}`} />}
                  nativeButton={false}
                >
                  <Eye />
                  <span className="sr-only">Ver</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  render={<Link href={`/services/${service.id}/edit`} />}
                  nativeButton={false}
                >
                  <Pencil />
                  <span className="sr-only">Editar</span>
                </Button>
                <DeleteServiceButton
                  id={service.id}
                  name={service.name}
                  projectCount={service.projectCount}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
