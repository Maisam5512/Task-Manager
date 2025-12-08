# --- BUILD STAGE ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy project files and build
COPY . .
RUN npm run build

# --- PRODUCTION STAGE ---
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

# Copy build files
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
