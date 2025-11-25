# -------- STAGE 1: Build --------
FROM node:20 AS builder

# Recibimos la variable desde GitHub Actions o Render
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar el resto del proyecto
COPY . .

# Compilar el frontend (Vite lee VITE_API_URL en build)
RUN npm run build


# -------- STAGE 2: Serve --------
FROM node:20-slim

WORKDIR /app

# Instalar servidor estático
RUN npm install -g serve

# Copiar artefactos del build
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Servimos la app
CMD ["serve", "-s", "dist", "-l", "3000"]