#!/bin/bash

# Lost and Found Portal - Setup Script for Linux/Mac

echo ""
echo "===================================="
echo "Lost and Found Portal - Setup"
echo "===================================="
echo ""

# Check for Docker
if command -v docker &> /dev/null; then
    echo "Docker found. Starting MySQL..."
    docker-compose up -d
    echo "Waiting for MySQL to start..."
    sleep 5
else
    echo "Docker not found. Make sure MySQL is running manually."
    echo "Create database: lost_found_db"
    echo "Update backend credentials in application.properties"
fi

echo ""
echo "Starting backend..."
(cd backend && mvn spring-boot:run) &
BACKEND_PID=$!

echo ""
echo "Waiting for backend to start..."
sleep 8

echo ""
echo "Starting frontend..."
(cd frontend && npm install && npm start) &
FRONTEND_PID=$!

echo ""
echo "===================================="
echo "Setup Complete!"
echo "===================================="
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8080"
echo "Adminer:  http://localhost:8081 (if using Docker)"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
