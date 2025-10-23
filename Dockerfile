# Stage 1: The Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
#Stage 2: The Production Stage
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
#Copy nginx config (Cloudflare handles SSL)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
#Expose port 80 only (Cloudflare terminates SSL)
EXPOSE 80
