export type LoginRequest = {
  email: string
  password: string
}

export interface User {
  id: number;
  name: string;
  role: 'ROLE_ADMIN' | 'ROLE_USER';
}