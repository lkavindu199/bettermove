#!/bin/bash
set -e

cd /root/apps/bettermoveco

echo "Stopping existing containers..."
docker-compose down --volumes --remove-orphans

export DOCKER_BUILDKIT=1

echo "Rebuilding Docker containers..."
if ! docker-compose up -d --build; then
    echo "Error: Containers failed to start. Checking logs..."
    docker-compose logs 
    exit 1
fi

echo "Verifying container status..."
if docker ps | grep -q "bettermoveco"; then
    echo "Deployment successful! Containers are running."
else
    echo "Error: Containers are not running. Check logs:"
    docker-compose logs
    exit 1
fi