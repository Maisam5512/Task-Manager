# # Build Stage
# FROM node:20-alpine AS builder
# WORKDIR /app

# COPY package*.json ./
# RUN npm ci

# COPY . .
# RUN npm run build

# # Production Stage
# FROM node:20-alpine
# WORKDIR /app

# ENV NODE_ENV=production

# COPY --from=builder /app ./

# EXPOSE 3000
# CMD ["npm", "start"]



# Step 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Run
FROM node:18
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
