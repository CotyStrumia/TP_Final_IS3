FROM node:20-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Generamos .env.production usando la variable de entorno
RUN echo "VITE_API_URL=$VITE_API_URL" > .env.production

RUN npm run build

FROM node:20-slim
WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
