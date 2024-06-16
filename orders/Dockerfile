# Dockerfile for order microservice
FROM node:18

WORKDIR /app

# Copy the order service files
COPY . .

# Install dependencies including ball-com
RUN npm install

# Command to run when container starts
CMD ["npm", "start"]

# Expose the port that your service runs on
EXPOSE 3000