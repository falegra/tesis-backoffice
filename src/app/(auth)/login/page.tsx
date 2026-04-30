import { LoginForm } from './_components/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-xl font-semibold tracking-tight">Panel Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">Ingresá tus credenciales para continuar</p>
        </div>
        <div className="bg-background border border-border rounded-xl p-8 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
