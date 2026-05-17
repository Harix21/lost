# Lost and Found Portal - Backend

Spring Boot REST API backend for the Lost and Found Portal application.

## Prerequisites

- Java 11 or higher
- Maven 3.6+
- MySQL Server 5.7 or higher

## Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE lost_found_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Update `src/main/resources/application.properties` with your database credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lost_found_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```

## Installation and Running

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean build
```

3. Run the application:
```bash
mvn spring-boot:run
```

The API will start on `http://localhost:8080`

## API Endpoints

### Items
- `GET /api/items` - Get all items
- `GET /api/items/{id}` - Get item by ID
- `GET /api/items/status/{status}` - Get items by status (lost/found/claimed)
- `GET /api/items/user/{email}` - Get items by user email
- `GET /api/items/category/{category}` - Get items by category
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update item
- `PATCH /api/items/{id}/status` - Update item status
- `DELETE /api/items/{id}` - Delete item
- `GET /api/items/health` - Health check

## Project Structure

```
src/main/java/com/lostandfound/
├── LostAndFoundPortalApplication.java
├── controller/
│   └── ItemController.java
├── service/
│   └── ItemService.java
├── repository/
│   └── ItemRepository.java
├── model/
│   ├── Item.java
│   └── ItemStatus.java
├── dto/
│   └── ItemDTO.java
└── exception/
    └── GlobalExceptionHandler.java
```

## Configuration

The application uses Spring Data JPA with Hibernate for ORM. Modify `application.properties` to adjust:
- Database connection settings
- JPA/Hibernate configuration
- Logging levels
- Server port

## Key Technologies

- Spring Boot 2.7.14
- Spring Data JPA
- Hibernate ORM
- MySQL Connector
- Lombok
- Maven

## CORS Configuration

The API allows cross-origin requests from `http://localhost:3000` (React frontend). Modify the `@CrossOrigin` annotation in `ItemController` if needed.
