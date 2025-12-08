# --- BUILD STAGE ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files & install dependencies
COPY package*.json ./
RUN npm ci

# Copy everything & build
COPY . .
RUN npm run build

# --- FINAL IMAGE ---
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Copy compiled build from builder stage
COPY --from=builder /app ./

EXPOSE 3000

# Run the production server
CMD ["npm", "start"]
