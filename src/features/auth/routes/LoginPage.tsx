import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { loginRequest } from '../api/loginRequest'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await loginRequest({ email, password })
      const { token } = response.data
      login(token)

      toast.success('Bienvenido de nuevo')

      navigate('/productos')
    } catch (error: any) {
      console.error('Error en login:', error)
      toast.error(error.response?.data?.message || 'Credenciales inválidas')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Iniciar Sesión</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full rounded-md border p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              className="w-full rounded-md border p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Conectando...' : 'Ingresar'}
          </Button>
        </div>
      </form>
    </div>
  )
}
