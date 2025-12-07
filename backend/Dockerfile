# FROM node:20-alpine
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm ci --omit=dev
# COPY . .
# EXPOSE 5000
# CMD [\"node\", \"server.js\"]


# Stage 1: Build/Install Dependencies
FROM node:20-alpine AS base

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
# This leverages Docker's layer caching
COPY package*.json ./

# Install only production dependencies
# 'npm ci' is preferred for CI/CD
RUN npm ci --omit=dev

# Copy the rest of the application source code
# Ensure you have a good .dockerignore file!
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]