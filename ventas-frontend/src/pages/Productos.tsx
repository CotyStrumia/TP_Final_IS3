import { useEffect, useState } from 'react'
import api from '../api/axios'
import { AxiosResponse, AxiosError } from 'axios'

export default function Productos() {
  const [productos, setProductos] = useState<any[]>([])

  useEffect(() => {
    api().then(apiInstance => {
      apiInstance.get("/productos")
        .then((res: AxiosResponse) => setProductos(res.data))
        .catch((err: AxiosError) => console.error(err))
    })
  }, [])

  return (
    <div>
      <h2>📦 Productos</h2>
      <ul>
        {productos.map((p: any) => (
          <li key={p.id}>
            {p.nombre} – ${p.precio} – Stock: {p.stock}
          </li>
        ))}
      </ul>
    </div>
  )
}
