import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

if (!baseURL) {
  console.error("❌ ERROR: VITE_API_URL no está configurado en este entorno.")
  throw new Error("VITE_API_URL es obligatorio. Configuralo en Render o en un .env.local")
}

const api = axios.create({
  baseURL
})

api.interceptors.request.use((config) => {
  
  const token = localStorage.getItem('token')

  config.headers = config.headers || {}

  

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export default api
