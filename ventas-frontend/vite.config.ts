import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import history from "connect-history-api-fallback";

export default defineConfig({
  plugins: [
    react(),

    // 🔥 Plugin para que el preview soporte rutas SPA
    {
      name: "spa-fallback",
      configureServer(server) {
        server.middlewares.use(
          history({
            index: "/index.html",
          })
        );
      },
    },
  ],

  server: {
    port: 5174,
    host: "0.0.0.0",
  },

  preview: {
    port: 5174,
    host: "0.0.0.0",
  },
});
