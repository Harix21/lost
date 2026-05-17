# System Requirements

## Hardware Requirements
- RAM: Minimum 2GB (4GB recommended)
- Storage: Minimum 500MB free space
- Internet: For npm/Maven dependency downloads

## Software Requirements

### Option 1: With Docker (Recommended)
- Docker Desktop (includes Docker and Docker Compose)
- Java 11+ (for Spring Boot)
- Node.js 14+ (for React)
- Maven 3.6+ (for Spring Boot build)

### Option 2: Without Docker
- MySQL Server 5.7 or higher
- Java 11 or higher
- Node.js 14 or higher
- Maven 3.6 or higher
- npm 6 or higher

## Installation Guides

### Windows

#### Install Java
1. Download from https://adoptopenjdk.net/
2. Run installer and follow instructions
3. Verify: `java -version`

#### Install Maven
1. Download from https://maven.apache.org/download.cgi
2. Extract to a folder
3. Add to PATH
4. Verify: `mvn -v`

#### Install Node.js
1. Download from https://nodejs.org/ (LTS version)
2. Run installer and follow instructions
3. Verify: `node -v` and `npm -v`

#### Install Docker (Optional but recommended)
1. Download Docker Desktop from https://www.docker.com/products/docker-desktop
2. Run installer
3. Verify: `docker --version`

### macOS

```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Java
brew install openjdk@11

# Install Maven
brew install maven

# Install Node.js
brew install node

# Install Docker (Optional)
brew install --cask docker
```

### Linux (Ubuntu/Debian)

```bash
# Update package manager
sudo apt-get update

# Install Java
sudo apt-get install openjdk-11-jdk

# Install Maven
sudo apt-get install maven

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Docker (Optional)
sudo apt-get install docker.io
sudo usermod -aG docker $USER
```

## Port Requirements

The application uses these ports:
- 3000: React Frontend
- 8080: Spring Boot Backend API
- 3306: MySQL Database (if running locally)
- 8081: Adminer (if using Docker)

Ensure these ports are available and not in use by other applications.

## Environment Variables

Create `.env` files in both frontend and backend directories:

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8080/api
```

### Backend (application.properties)
```
spring.datasource.url=jdbc:mysql://localhost:3306/lost_found_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```

## Firewall Configuration

If you have a firewall enabled, ensure:
- Port 3000 is open for React
- Port 8080 is open for Spring Boot
- Port 3306 is open for MySQL (local connections)

## Proxy Configuration

If behind a corporate proxy:

### Maven
Create/edit `~/.m2/settings.xml` with proxy settings

### npm
```bash
npm config set proxy [proxy-url]
npm config set https-proxy [proxy-url]
```

## Verification

After installation, verify everything is working:

```bash
java -version      # Should show Java 11+
javac -version     # Should work
mvn -v             # Should show Maven version
node -v            # Should show Node.js version
npm -v             # Should show npm version
docker --version   # Should show Docker version (if using Docker)
```
