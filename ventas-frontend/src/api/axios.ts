import axios from "axios";

const apiURL =
  // ⭐ Cuando Vite compila en Render: viene VITE_API_URL → se usa
  import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== ""
    ? import.meta.env.VITE_API_URL
    : // ⭐ Cuando corre en Cypress o en tu máquina → fallback
      "http://localhost:8080";

console.log("API URL usada:", apiURL);

const api = axios.create({
  baseURL: apiURL,
});

// 4) Token (normal)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers = config.headers || {}
  if (token) config.headers["Authorization"] = `Bearer ${token}`
  return config
})

console.log("API URL usada:", import.meta.env.VITE_API_URL)


export default api
