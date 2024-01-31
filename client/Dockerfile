# Use a smaller base image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application files
COPY . .

# Build the application (modify the command as needed)
RUN npm run build

# Expose the port your app will run on
EXPOSE 3000

# Start the application using a process manager (e.g., PM2)
CMD ["npm", "start"]
