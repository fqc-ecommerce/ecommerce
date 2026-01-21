import { auth } from '@/lib/axiosConfig'
import type { LoginRequest } from '../types'

export const loginRequest = async ({ email, password }: LoginRequest) => {
  const payload = {
    email,
    password,
  }

  const response = await auth.post('/login', payload)
  return response
}
