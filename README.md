# Lost and Found Portal - Complete Setup Guide

A full-stack Lost and Found Portal application built with React.js (Frontend), Spring Boot (Backend), and MySQL (Database).

## 📋 Project Structure

```
lost2/
├── frontend/                    # React.js Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── backend/                     # Spring Boot Backend
│   ├── src/
│   ├── pom.xml
│   └── README.md
├── docker-compose.yml          # Docker configuration for MySQL
├── init-db.sql                 # Database initialization script
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- **Frontend**: Node.js 14+ and npm/yarn
- **Backend**: Java 11+, Maven 3.6+
- **Database**: MySQL 5.7+ (or Docker with Docker Compose)

### Step 1: Setup Database

#### Option A: Using Docker (Recommended)

```bash
docker-compose up -d
```

This will start:
- MySQL server on port 3306
- Adminer (MySQL UI) on port 8081 (http://localhost:8081)

#### Option B: Manual MySQL Setup

1. Install MySQL Server
2. Create database:
```sql
CREATE DATABASE lost_found_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Import the schema:
```bash
mysql -u root -p lost_found_db < init-db.sql
```

### Step 2: Setup Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lost_found_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```

3. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

### Step 3: Setup Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Frontend will open at `http://localhost:3000`

## ✨ Features

### Core Features
- ✅ Report Lost Items - Users can report items they've lost
- ✅ Report Found Items - Users can report items they've found
- ✅ Browse Items - View all lost and found items
- ✅ Search & Filter - Filter items by status and category
- ✅ Item Details - View detailed information about items
- ✅ Contact Owner - Send messages to item owners
- ✅ Manage Listings - View and manage your own listings
- ✅ Update Status - Mark items as lost, found, or claimed

### Categories Supported
- Electronics
- Jewelry
- Clothing
- Documents
- Bags/Luggage
- Other

### Item Statuses
- Lost
- Found
- Claimed

## 🏗️ Architecture

### Frontend (React.js)
- Single Page Application (SPA)
- React Router for navigation
- Axios for API communication
- Responsive design with CSS
- Component-based architecture

### Backend (Spring Boot)
- RESTful API
- Spring Data JPA with Hibernate
- MySQL Database Integration
- CORS enabled for frontend communication
- Global exception handling
- DTO pattern for data transfer

### Database (MySQL)
- Normalized schema
- Indexed queries for performance
- Timestamps for audit trail
- Foreign key relationships

## 📡 API Endpoints

### Items Management
```
GET    /api/items                   - Get all items
GET    /api/items/{id}              - Get item by ID
GET    /api/items/status/{status}   - Get items by status
GET    /api/items/user/{email}      - Get user's items
GET    /api/items/category/{cat}    - Get items by category
POST   /api/items                   - Create new item
PUT    /api/items/{id}              - Update item
PATCH  /api/items/{id}/status       - Update item status
DELETE /api/items/{id}              - Delete item
GET    /api/items/health            - Health check
```

## 🔧 Configuration

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8080/api
```

### Backend (application.properties)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lost_found_db
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=create-drop
```

## 📊 Database Schema

### Items Table
```sql
CREATE TABLE items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    date_lost DATE NOT NULL,
    status ENUM('LOST', 'FOUND', 'CLAIMED') NOT NULL,
    date_reported DATE NOT NULL,
    image_url VARCHAR(500),
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Running the Application

### Terminal 1 - Start MySQL (if using Docker)
```bash
docker-compose up -d
```

### Terminal 2 - Start Backend
```bash
cd backend
mvn spring-boot:run
```

### Terminal 3 - Start Frontend
```bash
cd frontend
npm start
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📦 Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

Creates optimized build in `frontend/build` directory.

### Backend Build
```bash
cd backend
mvn clean package
```

Creates JAR file in `backend/target` directory.

## 🐛 Troubleshooting

### MySQL Connection Issues
- Verify MySQL is running
- Check credentials in `application.properties`
- Ensure port 3306 is not blocked

### Frontend Can't Connect to Backend
- Verify backend is running on port 8080
- Check `REACT_APP_API_URL` in `.env`
- Check browser console for CORS errors

### Java/Maven Issues
- Ensure Java 11+ is installed: `java -version`
- Ensure Maven 3.6+ is installed: `mvn -v`

## 📝 License

This project is open source and available for educational purposes.

## 📧 Support

For issues or questions, please refer to individual README files in frontend/ and backend/ directories.

---

Happy coding! 🎉
