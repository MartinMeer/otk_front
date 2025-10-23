# Production Deployment Guide

## Overview
This project uses **nginx proxy architecture** with **Cloudflare SSL** (free plan) handling SSL termination.

## 🏗️ Architecture
```
User → Cloudflare (SSL) → Frontend Container (nginx:80) → Backend Container (:8081)
                            ├─ Static files
                            └─ /api/* proxy → backend
```

## ✅ Current Status
- ✅ **OST22 calculator** - fully working
- ✅ **ESDP calculator** (GOST 25347-82) - implemented  
- ✅ **Docker configuration** - nginx proxy setup
- ✅ **API configuration** - relative paths with nginx proxy
- ✅ **SSL configuration** - Cloudflare handles SSL
- ❌ **Thread calculator** - not implemented yet
- ❌ **Chamfer calculator** - not implemented yet

## 🚀 Deployment Steps

### 1. Cloudflare Setup
1. **DNS**: Point your domain to your server IP in Cloudflare
2. **SSL Mode**: Set to "Full" (recommended) or "Flexible"
   - Dashboard → SSL/TLS → Overview → Set encryption mode
3. **Always Use HTTPS**: Enable redirect
   - Dashboard → SSL/TLS → Edge Certificates → Always Use HTTPS: ON

### 2. Build & Deploy

**Frontend:**
```bash
# Build production version
npm run build

# Create deployment artifacts
npm run deploy

# Build Docker image
docker build -t youruser/otk-frontend .
```

**Backend:**
```bash
# In your backend repo
docker build -t youruser/otk-backend .
```

**Deploy with Docker Compose:**
```bash
# Copy docker-compose.yml to your server
# Update image names in docker-compose.yml

# Deploy both containers
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs frontend
docker-compose logs backend
```

### 3. Verify Deployment
- ✅ **https://yourdomain.com** - loads home page
- ✅ **https://yourdomain.com/#ost22** - OST22 calculator works
- ✅ **https://yourdomain.com/#esdp** - ESDP calculator works
- ❌ **Thread/Chamfer calculators** - will show "coming soon" or errors

## 🔧 Configuration Files Updated

### Docker Configuration
- **Dockerfile**: Removed SSL certificate copying, only exposes port 80
- **nginx/default.conf**: Added API proxy to backend container
- **docker-compose.yml**: Defines both frontend and backend services

### API Configuration  
- **config/api.ts**: Now uses `/api/` relative paths (nginx proxy)
- **nginx proxy**: `/api/*` requests forwarded to `backend:8081`

### How the Proxy Works
```
Frontend JS: fetch('/api/ost22', data)
     ↓
Nginx sees: /api/ost22
     ↓  
Nginx proxies to: http://backend:8081/ost22
     ↓
Backend receives: POST /ost22
```

**Key Benefits:**
- ✅ No CORS issues (same origin)
- ✅ Single domain for users
- ✅ Backend not exposed to internet
- ✅ Simple container networking

## 🛡️ Security
Cloudflare provides:
- SSL/TLS encryption
- DDoS protection  
- Web Application Firewall (WAF)
- Bot protection

## 📋 Pre-Production Checklist
- [ ] Cloudflare SSL mode configured
- [ ] Backend API CORS allows your domain
- [ ] Test OST22 calculator end-to-end
- [ ] Test ESDP calculator end-to-end
- [ ] Hide or implement missing calculators
- [ ] Update contact information in footer
- [ ] Add real Open Graph images

## 🚨 Known Issues
1. **Missing calculators**: Thread and Chamfer calculators are referenced in UI but not implemented
2. **API dependency**: Ensure backend at `api.otk-help.martinmeer.com` is running and accessible

## 🔄 Rolling Updates
```bash
# Pull latest code
git pull

# Rebuild images
npm run build
docker build -t youruser/otk-frontend .

# Update containers
docker-compose down
docker-compose up -d

# Check logs
docker-compose logs -f
```

## 🛠️ Development Setup

**For local development, use localhost backend:**

1. **Start your backend locally** on `localhost:8081`

2. **Update API config for development:**
```typescript
// config/api.ts
export const API_CONFIG = {
  // BASE_URL: '/api/', // Production (nginx proxy)
  BASE_URL: 'http://localhost:8081/', // Development
  // ...
};
```

3. **Start frontend dev server:**
```bash
npm run dev
```

**Development flow:**
```
Frontend (localhost:8001) → Backend (localhost:8081)
```

**Production flow:**
```
User → Cloudflare → Frontend Container (nginx) → Backend Container
```

## 📞 Support
- **Working calculators**: OST22, ESDP (GOST 25347-82)
- **Domain**: Configure through Cloudflare dashboard
- **SSL**: Automatically managed by Cloudflare
