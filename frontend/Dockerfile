# Step 1: Base image
FROM node:20-alpine

# Step 2: Set working 
WORKDIR /app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy frontend code
COPY . .

# Step 6: Build Next.js app
RUN npm run build

# Step 7: Expose frontend port
EXPOSE 3000

# Step 8: Start Next.js
CMD ["npm", "start"]
