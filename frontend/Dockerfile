# Dockerfile.backend

# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "start"]
