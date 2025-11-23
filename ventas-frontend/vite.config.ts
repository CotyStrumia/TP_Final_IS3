import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],

  // 🔥 ESTO ES LO QUE FALTA
  preview: {
    port: 5174,
    host: "0.0.0.0",
  },

  server: {
    port: 5174,
    host: "0.0.0.0",
  },

  // 🔥🔥 LO MÁS IMPORTANTE → fallback para SPA
  build: {
    rollupOptions: {},
  },

  // ESTA ES LA CLAVE REAL
  optimizeDeps: {},
})
