export interface ApiError {
  status: number
  message: string
  details?: unknown
}

export interface NavItem {
  label: string
  href: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}
