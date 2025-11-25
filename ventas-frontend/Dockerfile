# -------- STAGE 1: Build --------
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos primero dependencias → mejor caching
COPY package.json package-lock.json ./
RUN npm ci

# Copiamos el resto del proyecto
COPY . .

# ⬅️ El frontend se construye acá, respetando VITE_API_URL
RUN npm run build


# -------- STAGE 2: Serve (imagen final) --------
FROM node:20-alpine

WORKDIR /app

# Instalar servidor estático
RUN npm install -g serve

# Copiar el build del stage anterior
COPY --from=builder /app/dist ./dist

# Puerto del server estático
EXPOSE 3000

# Comando final
CMD ["serve", "-s", "dist", "-l", "3000"]
