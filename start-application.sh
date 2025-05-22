#!/bin/bash
set -e

cd /root/apps/bettermoveco

echo "Stopping existing containers..."
docker-compose down --volumes --remove-orphans

export DOCKER_BUILDKIT=1

echo "Rebuilding Docker containers..."
if ! docker-compose up -d --build --no-cache 2>docker-compose.log; then
    cat docker-compose.log
    echo "Deployment failed!"
    exit 1
fi

rm -f docker-compose.log
echo "Deployment complete!"