# -------- STAGE 1: Build --------
FROM node:20-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# ⬅️ Crear un .env con la variable de entorno de Render
RUN echo "VITE_API_URL=$VITE_API_URL" > .env

RUN npm run build


# -------- STAGE 2: Serve --------
FROM node:20-slim
WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
