# Use the official Node.js image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install -g ts-node-dev

RUN npm install 

# Copy the rest of the application code
COPY ./src .

# Expose a port (if your application needs it)
EXPOSE 5000

# Define the command to run your application
CMD [ "npm", "start" ]