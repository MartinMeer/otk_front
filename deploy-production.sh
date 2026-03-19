#!/bin/bash

# Production Deployment Script for OTK Project
# Run this script on your production server

set -e  # Exit on any error

echo "🚀 OTK Production Deployment Script"
echo "=================================="

# Configuration
FRONTEND_IMAGE="martinmeer/otk-frontend:latest"
BACKEND_IMAGE="martinmeer/otk-backend:latest" 
PROJECT_DIR="/opt/otk-project"

echo "📋 Configuration:"
echo "  Frontend Image: $FRONTEND_IMAGE"
echo "  Backend Image:  $BACKEND_IMAGE"
echo "  Deploy Dir:     $PROJECT_DIR"
echo

# Create project directory
echo "📂 Creating project directory..."
sudo mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# Copy docker-compose.yml (you need to upload this file first)
echo "📄 Checking docker-compose.yml..."
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ ERROR: docker-compose.yml not found in $PROJECT_DIR"
    echo "   Please upload docker-compose.yml to this directory first:"
    echo "   scp docker-compose.yml user@yourserver:$PROJECT_DIR/"
    exit 1
fi

# Update images in docker-compose.yml (replace youruser with actual username)
echo "🔧 Updating image names in docker-compose.yml..."
echo "   NOTE: Make sure to replace 'youruser' with your actual Docker Hub username"

# Pull latest images
echo "📥 Pulling latest images..."
docker pull $FRONTEND_IMAGE || echo "⚠️  Could not pull $FRONTEND_IMAGE (build it first)"
docker pull $BACKEND_IMAGE || echo "⚠️  Could not pull $BACKEND_IMAGE (build it first)"

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down || echo "   No existing containers to stop"

# Start containers
echo "🔄 Starting containers..."
docker-compose up -d

# Wait a moment for containers to start
echo "⏳ Waiting for containers to start..."
sleep 5

# Check container status
echo "📊 Container Status:"
docker-compose ps

# Show logs
echo "📝 Recent logs:"
echo "--- Frontend logs ---"
docker-compose logs --tail=10 frontend
echo "--- Backend logs ---" 
docker-compose logs --tail=10 backend

# Final checks
echo "🔍 Final Checks:"
echo "  ✓ Frontend: http://$(curl -s ifconfig.me):80"
echo "  ✓ With Cloudflare: https://otk-help.martinmeer.com"
echo
echo "🎉 Deployment complete!"
echo "   Check the logs above for any errors."
echo "   Configure Cloudflare DNS to point to this server's IP."
