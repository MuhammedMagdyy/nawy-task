# Base image with dependencies
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Development image, keep source files and install dev deps
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY src/prisma ./prisma
RUN npm run db:generate
RUN npm run build

# Use environment variables from docker-compose
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production image, copy built app and runtime deps
FROM base AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=development /app/dist ./dist
COPY --from=development /app/prisma ./prisma
COPY package.json ./

# Generate Prisma client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Use environment variables from docker-compose
ENV PORT=3000
EXPOSE 3000

# Run migrations and start the application
CMD sh -c "npx prisma migrate deploy && node dist/index.js"