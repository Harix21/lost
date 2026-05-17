# Comprehensive Setup and Installation Guide

Follow this guide to set up and run the Lost and Found Portal locally.

## 📋 Table of Contents

1. [Prerequisites Check](#prerequisites-check)
2. [Step-by-Step Installation](#step-by-step-installation)
3. [Running the Application](#running-the-application)
4. [Verification](#verification)
5. [Troubleshooting](#troubleshooting)
6. [Next Steps](#next-steps)

---

## 📋 Prerequisites Check

Before starting, ensure you have:

- [ ] Java 11 or higher
- [ ] Maven 3.6 or higher
- [ ] Node.js 14 or higher
- [ ] npm 6 or higher
- [ ] MySQL 5.7+ OR Docker
- [ ] Git (optional, for version control)

Verify by running:
```bash
java -version
mvn -v
node -v
npm -v
```

See `SETUP_REQUIREMENTS.md` for detailed installation instructions.

---

## 🔧 Step-by-Step Installation

### Phase 1: Database Setup

#### Option A: Using Docker (Recommended for beginners)

**Windows:**
1. Install Docker Desktop from https://www.docker.com/products/docker-desktop
2. Open PowerShell and navigate to project root:
   ```powershell
   cd c:\Users\[YourUsername]\Desktop\lost2
   docker-compose up -d
   ```

**macOS/Linux:**
1. Install Docker Desktop from https://www.docker.com/products/docker-desktop
2. Open terminal and navigate to project root:
   ```bash
   cd ~/Desktop/lost2
   docker-compose up -d
   ```

This will:
- ✅ Create and start MySQL database
- ✅ Load initial sample data
- ✅ Start Adminer for database management (port 8081)

**Verify Docker setup:**
```bash
docker ps
```

You should see containers running:
- lost_found_mysql
- lost_found_adminer

#### Option B: Manual MySQL Setup

**Windows:**
1. Download MySQL Community Server from https://dev.mysql.com/downloads/mysql/
2. Run installer, choose Setup Type: Developer Default
3. Accept defaults, set port to 3306
4. Configure MySQL Server as a service
5. Set root password (remember it!)
6. Complete installation

**macOS:**
```bash
brew install mysql@5.7
brew services start mysql@5.7
mysql_secure_installation
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mysql-server
sudo mysql_secure_installation
sudo service mysql start
```

**Create Database:**
```bash
mysql -u root -p
# Enter your password when prompted

CREATE DATABASE lost_found_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

**Import initial schema:**
```bash
mysql -u root -p lost_found_db < init-db.sql
```

---

### Phase 2: Backend Setup (Spring Boot)

**Windows:**
1. Open Command Prompt
2. Navigate to backend directory:
   ```cmd
   cd c:\Users\[YourUsername]\Desktop\lost2\backend
   ```

**macOS/Linux:**
1. Open Terminal
2. Navigate to backend directory:
   ```bash
   cd ~/Desktop/lost2/backend
   ```

#### Step 1: Configure Database Connection

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lost_found_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=[YOUR_MYSQL_PASSWORD]
```

#### Step 2: Build Project

```bash
mvn clean install
```

This will:
- ✅ Download all dependencies (may take 2-5 minutes first time)
- ✅ Compile the Java source code
- ✅ Run tests
- ✅ Package the application

#### Step 3: Run Backend

```bash
mvn spring-boot:run
```

**Expected output:**
```
Started LostAndFoundPortalApplication in X.XXX seconds
```

**Test the API:**
Open browser and visit: http://localhost:8080/api/items/health

You should see:
```json
{
  "status": "UP",
  "service": "Lost and Found Portal API"
}
```

---

### Phase 3: Frontend Setup (React)

**Open a new terminal/command prompt**

**Windows:**
```cmd
cd c:\Users\[YourUsername]\Desktop\lost2\frontend
```

**macOS/Linux:**
```bash
cd ~/Desktop/lost2/frontend
```

#### Step 1: Install Dependencies

```bash
npm install
```

This will:
- ✅ Download all npm packages (may take 2-5 minutes)
- ✅ Create node_modules folder
- ✅ Generate package-lock.json

#### Step 2: Configure API Endpoint

Verify `.env` file contains:
```
REACT_APP_API_URL=http://localhost:8080/api
```

#### Step 3: Start Development Server

```bash
npm start
```

**Expected behavior:**
- ✅ React app compiles successfully
- ✅ Browser opens automatically to http://localhost:3000
- ✅ You see the Lost & Found Portal homepage

---

## 🚀 Running the Application

### Quick Start (All-in-one)

**Windows (Command Prompt):**
```cmd
cd c:\Users\[YourUsername]\Desktop\lost2
setup.bat
```

**macOS/Linux (Terminal):**
```bash
cd ~/Desktop/lost2
chmod +x setup.sh
./setup.sh
```

### Manual Start (Recommended for Development)

**Terminal 1 - Start Database (if using Docker):**
```bash
docker-compose up -d
```

**Terminal 2 - Start Backend:**
```bash
cd backend
mvn spring-boot:run
```

Wait until you see: "Started LostAndFoundPortalApplication..."

**Terminal 3 - Start Frontend:**
```bash
cd frontend
npm start
```

Wait for browser to open automatically at http://localhost:3000

---

## ✅ Verification

### Backend Verification

**Check API is running:**
```bash
# Test health endpoint
curl http://localhost:8080/api/items/health

# Test get all items
curl http://localhost:8080/api/items
```

**Expected response for items:**
```json
[
  {
    "id": 1,
    "title": "Silver Watch",
    "status": "lost",
    ...
  }
]
```

### Frontend Verification

1. Open http://localhost:3000 in browser
2. You should see:
   - ✅ Navigation bar with logo "🔍 Lost & Found"
   - ✅ Hero section with welcome message
   - ✅ Quick action buttons
   - ✅ Info cards

### Database Verification

**Using Docker Adminer:**
1. Visit http://localhost:8081
2. Login with:
   - System: MySQL
   - Server: mysql
   - Username: root
   - Password: root
   - Database: lost_found_db

**Using Command Line:**
```bash
mysql -u root -p lost_found_db
SELECT COUNT(*) FROM items;
```

---

## 🧪 Test the Application

### Test Flow:

1. **View Home Page** - http://localhost:3000
   - Should load successfully

2. **Browse Items** - Click "Browse Items"
   - Should display sample items

3. **Report Lost Item** - Click "Report Lost"
   - Fill form and submit
   - Should see success message

4. **View Details** - Click "View Details" on any item
   - Should see full item information

5. **Check Backend Logs** - Look at Terminal 2
   - Should see API requests being logged

---

## 🐛 Troubleshooting

### Issue: MySQL Connection Error

**Error:** `java.sql.SQLNonTransientConnectionException: Cannot get a connection`

**Solution:**
1. Verify MySQL is running:
   ```bash
   # With Docker
   docker ps
   
   # Manual MySQL
   mysql -u root -p -e "SELECT 1;"
   ```

2. Check credentials in `application.properties`
3. Verify database exists:
   ```bash
   mysql -u root -p -e "SHOW DATABASES;"
   ```

### Issue: Port Already in Use

**Error:** `Address already in use`

**Solution:**
- Kill process using port:
  ```bash
  # Windows
  netstat -ano | findstr :8080
  taskkill /PID [PID] /F
  
  # macOS/Linux
  lsof -ti:8080 | xargs kill -9
  ```

### Issue: npm install fails

**Error:** `npm ERR! code ERESOLVE, npm ERR! ERESOLVE unable to resolve dependency tree`

**Solution:**
```bash
npm install --legacy-peer-deps
# or
npm install --force
```

### Issue: Frontend can't connect to backend

**Error:** CORS error in browser console

**Verify:**
1. Backend is running on port 8080
2. `REACT_APP_API_URL=http://localhost:8080/api` in frontend `.env`
3. Check browser console for exact error

### Issue: Java not found

**Error:** `'java' is not recognized as an internal or external command`

**Solution:**
- Install Java 11+
- Add Java to PATH environment variable
- Verify: `java -version`

---

## 📊 Application URLs

| Component | URL | Purpose |
|-----------|-----|---------|
| Frontend | http://localhost:3000 | React web application |
| Backend API | http://localhost:8080/api | REST API endpoints |
| Database UI (Adminer) | http://localhost:8081 | MySQL management interface |
| API Health Check | http://localhost:8080/api/items/health | API status |

---

## 🎯 Next Steps

After successful setup:

1. **Explore Features:**
   - Report a lost item
   - Report a found item
   - Browse and filter items
   - View item details
   - Contact item owners

2. **Customization:**
   - Modify styling in `frontend/src/App.css`
   - Add new item categories in backend
   - Customize email notifications
   - Add user authentication

3. **Deployment:**
   - Build frontend: `npm run build`
   - Build backend: `mvn clean package`
   - Deploy to cloud platform (AWS, Azure, Heroku, etc.)

4. **Enhancement Ideas:**
   - Add image upload functionality
   - Implement user authentication & profiles
   - Add email notifications
   - Create mobile app
   - Add advanced search filters
   - Implement messaging system

---

## 📞 Getting Help

If you encounter issues:

1. Check `SETUP_REQUIREMENTS.md` for detailed prerequisites
2. Review troubleshooting section above
3. Check individual README files:
   - `frontend/README.md` - Frontend specific help
   - `backend/README.md` - Backend specific help
4. Verify all services are running: MySQL, Backend, Frontend

---

**Congratulations!** 🎉 Your Lost and Found Portal is now running locally!

For any questions or issues, refer to the comprehensive documentation in each component's README file.
