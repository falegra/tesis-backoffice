'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { deleteService } from '../_actions'

interface DeleteServiceButtonProps {
  id: string
  name: string
  projectCount: number
}

export function DeleteServiceButton({ id, name, projectCount }: DeleteServiceButtonProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteService(id)
      if (!result.ok) {
        toast.error(result.message)
        setOpen(false)
        return
      }
      toast.success('Servicio eliminado')
      setOpen(false)
      router.push('/services')
    })
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        title={projectCount > 0 ? 'Tiene proyectos asociados' : 'Eliminar servicio'}
        onClick={() => setOpen(true)}
        className="text-destructive hover:text-destructive"
      >
        <Trash2 />
        <span className="sr-only">Eliminar</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar servicio</DialogTitle>
            <DialogDescription>
              {projectCount > 0 ? (
                <>
                  El servicio <strong>{name}</strong> tiene {projectCount} proyecto{projectCount !== 1 ? 's' : ''} asociado{projectCount !== 1 ? 's' : ''} y no puede ser eliminado.
                </>
              ) : (
                <>
                  ¿Estás seguro de que querés eliminar <strong>{name}</strong>? Esta acción no se puede deshacer.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
              Cancelar
            </Button>
            {projectCount === 0 && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? 'Eliminando...' : 'Eliminar'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
