import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],

  // 🔥 Esto soluciona TODOS los 404 en rutas SPA
  appType: "spa",

  server: {
    port: 5174,
    host: "0.0.0.0",
  },

  preview: {
    port: 5174,
    host: "0.0.0.0",
  },
});
