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
#Create dir for ssl
RUN mkdir -p /etc/nginx/ssl
#Copy ssl key&cert
COPY nginx/self-signed.key /etc/nginx/ssl
COPY nginx/self-signed.crt /etc/nginx/ssl
#Copy nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
#Expose ports
EXPOSE 80
EXPOSE 443
