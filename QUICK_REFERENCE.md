# Quick Reference Guide

## 🎯 Essential Commands

### Database

#### Start MySQL with Docker
```bash
docker-compose up -d
```

#### Stop MySQL
```bash
docker-compose down
```

#### View MySQL container logs
```bash
docker logs lost_found_mysql
```

#### Access MySQL via command line
```bash
mysql -h 127.0.0.1 -u root -p lost_found_db
```

#### Reset database
```bash
docker-compose down -v
docker-compose up -d
```

---

### Backend (Spring Boot)

#### Build project
```bash
cd backend
mvn clean install
```

#### Run application
```bash
mvn spring-boot:run
```

#### Build JAR file
```bash
mvn clean package
```

#### Run JAR file
```bash
java -jar target/lostandfound-portal-1.0.0.jar
```

#### Run tests
```bash
mvn test
```

#### Clean project
```bash
mvn clean
```

#### Skip tests during build
```bash
mvn clean install -DskipTests
```

#### View dependency tree
```bash
mvn dependency:tree
```

---

### Frontend (React)

#### Install dependencies
```bash
cd frontend
npm install
```

#### Start development server
```bash
npm start
```

#### Build for production
```bash
npm run build
```

#### Run tests
```bash
npm test
```

#### Clean dependencies
```bash
rm -rf node_modules
npm install
```

#### Install specific package
```bash
npm install package-name
```

#### Check for security vulnerabilities
```bash
npm audit
```

#### Fix vulnerabilities
```bash
npm audit fix
```

---

## 🔗 API Quick Endpoints

### Base URL
```
http://localhost:8080/api
```

### Useful Endpoints

```bash
# Get all items
curl http://localhost:8080/api/items

# Get item by ID
curl http://localhost:8080/api/items/1

# Get lost items
curl http://localhost:8080/api/items/status/lost

# Get user's items
curl "http://localhost:8080/api/items/user/john@example.com"

# Create item (POST)
curl -X POST http://localhost:8080/api/items \
  -H "Content-Type: application/json" \
  -d '{"title":"Item","description":"Desc","category":"jewelry","location":"Loc","dateLost":"2024-05-15","status":"lost","contactName":"Name","contactEmail":"email@test.com","contactPhone":"555-1234"}'

# Update status (PATCH)
curl -X PATCH http://localhost:8080/api/items/1/status \
  -H "Content-Type: application/json" \
  -d '{"status":"claimed"}'

# Delete item
curl -X DELETE http://localhost:8080/api/items/1

# Health check
curl http://localhost:8080/api/items/health
```

---

## 📁 Project Structure Quick Reference

```
lost2/
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── App.js            # Main app
│   │   └── index.js          # Entry point
│   ├── public/
│   ├── package.json
│   └── README.md
├── backend/
│   ├── src/main/
│   │   ├── java/com/lostandfound/
│   │   │   ├── controller/    # REST controllers
│   │   │   ├── service/       # Business logic
│   │   │   ├── repository/    # Data access
│   │   │   ├── model/         # JPA entities
│   │   │   ├── dto/           # Data transfer objects
│   │   │   ├── exception/     # Exception handling
│   │   │   └── App.java       # Main class
│   │   └── resources/
│   │       └── application.properties
│   ├── pom.xml
│   └── README.md
├── docker-compose.yml
├── init-db.sql
├── README.md
├── INSTALLATION_GUIDE.md
├── SETUP_REQUIREMENTS.md
├── API_DOCUMENTATION.md
├── FEATURES_GUIDE.md
└── QUICK_REFERENCE.md
```

---

## 🔍 Debugging

### Backend Debugging

#### Enable SQL logging
Edit `application.properties`:
```properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.use_sql_comments=true
```

#### Enable debug logging
```properties
logging.level.com.lostandfound=DEBUG
logging.level.org.hibernate.SQL=DEBUG
```

#### Check logs
Look at console output or:
```bash
tail -f logs/app.log
```

#### Common port issues
```bash
# Windows
netstat -ano | findstr :8080

# macOS/Linux
lsof -i :8080
```

### Frontend Debugging

#### Enable React Developer Tools
- Install React Developer Tools browser extension
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls

#### Debug API calls
```javascript
// In browser console
fetch('http://localhost:8080/api/items')
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## 🔧 Configuration Files

### Frontend Configuration

#### .env
```
REACT_APP_API_URL=http://localhost:8080/api
```

### Backend Configuration

#### application.properties
```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/lost_found_db
spring.datasource.username=root
spring.datasource.password=root

# JPA
spring.jpa.hibernate.ddl-auto=create-drop

# Logging
logging.level.root=INFO
logging.level.com.lostandfound=DEBUG
```

---

## 📊 Common Issues & Quick Fixes

| Issue | Command/Solution |
|-------|-----------------|
| Port 8080 in use | `lsof -ti:8080 \| xargs kill -9` |
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` |
| MySQL not running | `docker-compose up -d` |
| npm install stuck | `npm install --legacy-peer-deps` |
| Maven build fails | `mvn clean install -X` |
| Clear npm cache | `npm cache clean --force` |
| Reset database | `docker-compose down -v && docker-compose up -d` |
| Java not found | Set JAVA_HOME environment variable |

---

## 📈 Performance Tips

### Database
- Use indexes for frequently queried columns ✅
- Keep queries simple and specific
- Use pagination for large datasets

### Backend
- Enable caching for static data (future)
- Use connection pooling ✅
- Monitor memory usage
- Use lazy loading for entities

### Frontend
- Lazy load components
- Use React.memo for optimization
- Minimize bundle size
- Use production build for deployment

---

## 🚀 Deployment Checklist

### Before Deployment
- [ ] Build frontend: `npm run build`
- [ ] Build backend: `mvn clean package`
- [ ] Run tests: `npm test` & `mvn test`
- [ ] Update .env files
- [ ] Set production database URL
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up monitoring
- [ ] Create backups

### Deployment Steps
1. Deploy backend JAR to server
2. Deploy frontend build to web server
3. Configure environment variables
4. Set up database on production
5. Test all endpoints
6. Monitor logs

---

## 📞 Need Help?

1. **Installation Issues** → Read `INSTALLATION_GUIDE.md`
2. **API Questions** → Check `API_DOCUMENTATION.md`
3. **Feature Help** → See `FEATURES_GUIDE.md`
4. **System Requirements** → Review `SETUP_REQUIREMENTS.md`
5. **Backend Specific** → Check `backend/README.md`
6. **Frontend Specific** → Check `frontend/README.md`

---

## 🎓 Learning Resources

### React
- https://react.dev
- https://reactrouter.org

### Spring Boot
- https://spring.io/projects/spring-boot
- https://spring.io/guides

### MySQL
- https://dev.mysql.com/doc/

### Docker
- https://docs.docker.com/

---

**Last Updated:** May 17, 2024
**Version:** 1.0.0

---

**Happy Coding!** 🚀
