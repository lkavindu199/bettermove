#!/bin/bash

# Fail on any error
set -e

# Navigate to the directory with the docker-compose.yml file
cd /root/apps/bettermoveco

# Stop and remove existing containers, networks, volumes, and images
echo "Stopping existing containers..."
docker-compose down --volumes --remove-orphans

# Rebuild the containers without using cache
echo "Rebuilding Docker containers..."
docker-compose up -d --build --no-cache

# Optionally, you can add logging or any other commands you want to run after deployment
echo "Deployment complete!"