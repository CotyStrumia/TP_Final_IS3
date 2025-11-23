import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 5174,
  },
  build: {
    outDir: 'dist',
  },
  // 🔥 AGREGAR ESTO 🔥
  resolve: {
    alias: {
      // nada raro, pero lo dejamos por si
    },
  },
  optimizeDeps: {},

  // 👇 ESTO ES LO QUE IMPORTA 👇
  appType: 'spa',  // obliga fallback a index.html
});
