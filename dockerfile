# Base image
FROM node:18-alpine

# Working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 8080

# Command to run
CMD ["npm", "start"]