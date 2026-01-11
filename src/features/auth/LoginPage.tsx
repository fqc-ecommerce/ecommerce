import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import api from '@/api/axiosConfig'
import { toast } from 'sonner'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit_ = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      // 2. Extraer el token (asumiendo que Java responde { "token": "ey..." })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulamos el retraso de la red
    setTimeout(() => {
      const fakeToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViIjoiQWRtaW4gR2VuZXJhbCIsInJvbGUiOiJBRE1JTiIsImV4cCI6MTkwMDAwMDAwMH0.S_p8W_P6D2_2u5L0R0_7X8_9_0_1_2_3_4_5_6_7_8_9_0'

      // Al llamar a login, el contexto decodifica el 'sub' y el 'role'
      login(fakeToken)

      toast.success('Sesión iniciada como ADMIN')
      navigate('/productos')
      setIsLoading(false)
    }, 800)
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
