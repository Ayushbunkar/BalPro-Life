FROM node:20-alpine AS client-builder

WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

FROM node:20-alpine AS server-deps

WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

# Install backend production dependencies
COPY --from=server-deps /app/server/node_modules ./server/node_modules

# Copy backend source
COPY server ./server

# Copy frontend production build
COPY --from=client-builder /app/client/dist ./client/dist

# Runtime directory for uploaded files
RUN mkdir -p uploads

EXPOSE 5000

CMD ["node", "server/server.js"]