# ---------- STAGE 1: Build ----------
FROM node:20 AS builder

WORKDIR /app

# Instalamos dependencias con cache correcto
COPY package.json package-lock.json ./
RUN npm ci

# Copiamos el resto del proyecto (incluye public/config.json)
COPY . .

# Build del frontend (con config.json ya inyectado por GH Actions)
RUN npm run build

# ---------- STAGE 2: Static Server ----------
FROM node:20-slim

WORKDIR /app

# Instalamos servidor estático
RUN npm install -g serve

# Copiamos la carpeta dist final
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
