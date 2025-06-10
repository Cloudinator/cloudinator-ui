FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm i sharp --force
RUN npm run build

FROM node:18-alpine
RUN apk update && apk upgrade && apk add --no-cache dumb-init && \
    adduser -D nextuser
WORKDIR /app
  
# Copy the entire .next directory to preserve all assets including CSS
COPY --chown=nextuser:nextuser --from=builder /app/.next ./.next
COPY --chown=nextuser:nextuser --from=builder /app/public ./public
COPY --chown=nextuser:nextuser --from=builder /app/package*.json ./
COPY --chown=nextuser:nextuser --from=builder /app/node_modules ./node_modules
  
USER nextuser
EXPOSE 3000
  
ENV HOST=0.0.0.0 \
    PORT=3000 \
    NODE_ENV=production
      
CMD ["dumb-init", "node", "server.js"]
