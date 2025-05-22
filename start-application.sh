#!/bin/bash
set -e

cd /root/apps/bettermoveco

echo "Stopping existing containers..."
docker-compose down --volumes --remove-orphans

echo "Rebuilding Docker containers..."
DOCKER_BUILDKIT=1 docker-compose up -d --build --no-cache

echo "Deployment complete!"
