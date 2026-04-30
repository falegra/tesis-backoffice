import type { NavGroup } from '@/types/api'

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Contenido',
    items: [
      { label: 'Servicios', href: '/services' },
      { label: 'Proyectos', href: '/projects' },
      { label: 'Portfolio', href: '/portfolio' },
    ],
  },
  {
    label: 'Empresa',
    items: [
      { label: 'Info Empresa', href: '/company-info' },
      { label: 'Equipo', href: '/team' },
      { label: 'Legal', href: '/legal' },
    ],
  },
  {
    label: 'Operaciones',
    items: [
      { label: 'Solicitudes', href: '/contacts' },
    ],
  },
  {
    label: 'Cuenta',
    items: [
      { label: 'Cambiar Contraseña', href: '/change-password' },
    ],
  },
]
