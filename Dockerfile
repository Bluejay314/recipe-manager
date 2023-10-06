# Use a Node.js base image
FROM node:16.3.0-alpine

# Create a working directory for your app
WORKDIR /app

# Copy package.json and package-lock.json for server
COPY server/package*.json ./server/

# Copy package.json and package-lock.json for client
COPY client/package*.json ./client/

# Install server dependencies
WORKDIR /app/server
RUN npm install

# Install client dependencies
WORKDIR /app/client
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the ports your applications run on
EXPOSE 3010 5173

# Start both server and client
CMD ["npm", "start"]