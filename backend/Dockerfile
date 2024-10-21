# Stage 1: Build the TypeScript code
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./

# Install dependencies, including development dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose the port that your app runs on
EXPOSE 5000

# Run the application
CMD ["npm", "start"]
