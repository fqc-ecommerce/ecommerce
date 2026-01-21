import type { User } from '@/features/auth/types'
import { jwtDecode } from 'jwt-decode'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  login: (token: string) => void
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleToken = (token: string) => {
    try {
      const decoded = jwtDecode<any>(token)

      const userData: User = {
        id: decoded.id,
        email: decoded.sub || decoded.email,
        role: decoded.role,
      }

      setUser(userData)
    } catch (e) {
      logout()
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      handleToken(token)
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    handleToken(token)
  }

  const isAdminValue = user ? user.role === 'ROLE_ADMIN' : false

  const providerValue: AuthContextType = {
    user: user,
    isAdmin: isAdminValue,
    login: login,
    logout: logout,
  }

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
