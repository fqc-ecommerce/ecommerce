import { API_URL, AUTH_URL } from '@/config'
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from 'axios'

// Creamos la instancia con un tipado estricto
const auth: AxiosInstance = axios.create({
  baseURL: AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * INTERCEPTOR DE PETICIÓN
 * Se ejecuta antes de que la petición salga hacia el Microservicio.
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token')

    if (token && config.headers) {
      // Usamos el estándar Bearer Token para Spring Boot / Java
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

/**
 * INTERCEPTOR DE RESPUESTA
 * Útil para manejar errores globales como 401 (Unauthorized) o 403 (Forbidden)
 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // El token expiró o es inválido
          console.error('No autorizado - Redirigiendo al login')
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          // El usuario no tiene el ROL necesario (ej. USER intentando crear producto)
          console.error('Prohibido - No tienes permisos suficientes')
          break
        case 500:
          console.error('Error interno del servidor en el Microservicio')
          break
      }
    }
    return Promise.reject(error)
  },
)

export { auth, api }
