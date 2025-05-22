#!/bin/bash
set -e

# Navigate to the application directory
cd /root/apps/bettermoveco

# Stop and remove existing containers
echo "Stopping existing containers..."
docker-compose down --volumes --remove-orphans 2>/dev/null

# Enable BuildKit
export DOCKER_BUILDKIT=1

# Rebuild and restart containers
echo "Rebuilding Docker containers..."
docker-compose up -d --build --no-cache

echo "Deployment complete!"