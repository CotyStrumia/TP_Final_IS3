# ---------- STAGE 1: Build ----------
FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# 🔥 Recibe la variable desde GitHub Actions
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# 🔥 El build queda con la URL correcta (QA o PROD)
RUN npm run build


# ---------- STAGE 2: Static Server ----------
FROM node:20-slim

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
