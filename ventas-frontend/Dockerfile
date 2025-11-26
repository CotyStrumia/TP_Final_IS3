# ---------- STAGE 1: Build ----------
FROM node:20 AS builder

WORKDIR /app

# 👇 Primero instalamos dependencias (esto permite cachear correctamente)
COPY package.json package-lock.json ./
RUN npm ci

# 👇 Luego copiamos el resto del código
COPY . .

# 👇 Recibe la variable de GitHub Actions
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# 👇 Build del frontend usando la variable correcta
RUN npm run build


# ---------- STAGE 2: Static Server ----------
FROM node:20-slim

WORKDIR /app

# 👇 Servidor estático liviano
RUN npm install -g serve

# 👇 Traemos solo lo necesario: la carpeta dist
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
