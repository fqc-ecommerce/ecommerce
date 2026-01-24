export const BASE_URL = import.meta.env.VITE_API_GATEWAY_URL

let AUTH_URL = `${BASE_URL}/auth`
let API_URL = `${BASE_URL}/api`

if (BASE_URL == 'DEV') {
  AUTH_URL = '/auth'
  API_URL = '/api' 
}

export { AUTH_URL, API_URL }
