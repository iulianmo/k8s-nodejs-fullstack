# Use a Node.js base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend source code
COPY src/ .

# Set the command to start the backend server
CMD ["npm", "start"]