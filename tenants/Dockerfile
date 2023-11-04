# FROM node:alpine

# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .

# CMD [ "npm", "start" ]

FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json .

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Install PM2 globally
RUN npm install -g pm2

# Start your Node.js application with PM2
CMD ["pm2-runtime", "npm", "--","start"]