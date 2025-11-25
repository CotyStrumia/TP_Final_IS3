# -------- STAGE 1: Build --------
FROM node:20 AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm ci

# Copiar todo el proyecto
COPY . .

# Inyectar variable en build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# -------- STAGE 2: Serve estático --------
FROM node:20-slim

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
