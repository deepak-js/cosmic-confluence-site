# Use Node.js 22 LTS
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
# Including bun.lock if it exists, though we will use npm for standard compatibility
COPY package.json package-lock.json* bun.lock* ./

# Install dependencies using npm
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose the default port used in the start script
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
