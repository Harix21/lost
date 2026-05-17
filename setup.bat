@echo off
REM Lost and Found Portal - Setup Script for Windows

echo.
echo ====================================
echo Lost and Found Portal - Setup
echo ====================================
echo.

REM Check for Docker
where docker >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Docker found. Starting MySQL...
    docker-compose up -d
    echo Waiting for MySQL to start...
    timeout /t 5 /nobreak
) else (
    echo Docker not found. Make sure MySQL is running manually.
    echo Create database: lost_found_db
    echo Update backend credentials in application.properties
)

echo.
echo Starting backend...
start cmd /k "cd backend && mvn spring-boot:run"

echo.
echo Waiting for backend to start...
timeout /t 8 /nobreak

echo.
echo Starting frontend...
start cmd /k "cd frontend && npm install && npm start"

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8080
echo Adminer:  http://localhost:8081 (if using Docker)
echo.
