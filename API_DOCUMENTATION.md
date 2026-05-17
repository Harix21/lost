# API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication
Currently, the API uses no authentication. All endpoints are public.
(Future enhancement: Add JWT authentication)

---

## Endpoints

### Items

#### 1. Get All Items
**Endpoint:** `GET /items`

**Description:** Retrieve all items (lost, found, and claimed)

**Query Parameters:** None

**Response:**
```json
[
  {
    "id": 1,
    "title": "Silver Watch",
    "description": "A silver-colored watch with leather strap",
    "category": "jewelry",
    "location": "Central Park",
    "dateLost": "2024-05-10",
    "status": "lost",
    "dateReported": "2024-05-17",
    "imageUrl": "https://example.com/image.jpg",
    "contactName": "John Doe",
    "contactEmail": "john@example.com",
    "contactPhone": "555-1234"
  }
]
```

**Status Code:** 200 OK

---

#### 2. Get Item by ID
**Endpoint:** `GET /items/{id}`

**Description:** Retrieve a specific item by its ID

**Path Parameters:**
- `id` (Long) - Item ID

**Response:**
```json
{
  "id": 1,
  "title": "Silver Watch",
  ...
}
```

**Status Code:** 200 OK
**Error:** 404 Not Found

---

#### 3. Get Items by Status
**Endpoint:** `GET /items/status/{status}`

**Description:** Retrieve items filtered by status

**Path Parameters:**
- `status` (String) - Can be: `lost`, `found`, or `claimed`

**Example:**
```
GET /items/status/lost
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Silver Watch",
    "status": "lost",
    ...
  },
  ...
]
```

**Status Code:** 200 OK

---

#### 4. Get Items by Category
**Endpoint:** `GET /items/category/{category}`

**Description:** Retrieve items filtered by category

**Path Parameters:**
- `category` (String) - Can be: `electronics`, `jewelry`, `clothing`, `documents`, `bag`, `other`

**Example:**
```
GET /items/category/jewelry
```

**Response:**
```json
[
  {
    "id": 1,
    "category": "jewelry",
    ...
  }
]
```

**Status Code:** 200 OK

---

#### 5. Get User Items
**Endpoint:** `GET /items/user/{email}`

**Description:** Retrieve all items reported by a specific user

**Path Parameters:**
- `email` (String) - Contact email of the user

**Example:**
```
GET /items/user/john@example.com
```

**Response:**
```json
[
  {
    "id": 1,
    "contactEmail": "john@example.com",
    ...
  }
]
```

**Status Code:** 200 OK

---

#### 6. Create Item
**Endpoint:** `POST /items`

**Description:** Create a new item (lost or found)

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "title": "Red Wallet",
  "description": "Leather wallet with some cash inside",
  "category": "documents",
  "location": "Downtown Mall",
  "dateLost": "2024-05-15",
  "status": "lost",
  "imageUrl": "https://example.com/wallet.jpg",
  "contactName": "Jane Smith",
  "contactEmail": "jane@example.com",
  "contactPhone": "555-5678"
}
```

**Response:**
```json
{
  "id": 4,
  "title": "Red Wallet",
  "dateReported": "2024-05-17",
  ...
}
```

**Status Code:** 201 Created
**Error:** 400 Bad Request (missing required fields)

---

#### 7. Update Item
**Endpoint:** `PUT /items/{id}`

**Description:** Update an existing item

**Path Parameters:**
- `id` (Long) - Item ID

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "title": "Red Wallet - Updated",
  "description": "Updated description",
  ...
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Red Wallet - Updated",
  ...
}
```

**Status Code:** 200 OK
**Error:** 404 Not Found

---

#### 8. Update Item Status
**Endpoint:** `PATCH /items/{id}/status`

**Description:** Update the status of an item

**Path Parameters:**
- `id` (Long) - Item ID

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "status": "claimed"
}
```

**Response:**
```json
{
  "id": 1,
  "status": "claimed",
  ...
}
```

**Status Code:** 200 OK
**Error:** 404 Not Found

---

#### 9. Delete Item
**Endpoint:** `DELETE /items/{id}`

**Description:** Delete an item from the system

**Path Parameters:**
- `id` (Long) - Item ID

**Response:**
```json
{
  "message": "Item deleted successfully"
}
```

**Status Code:** 200 OK
**Error:** 404 Not Found

---

#### 10. Health Check
**Endpoint:** `GET /items/health`

**Description:** Check if the API is running

**Response:**
```json
{
  "status": "UP",
  "service": "Lost and Found Portal API"
}
```

**Status Code:** 200 OK

---

## Data Models

### Item Object
```typescript
{
  id: number              // Unique identifier
  title: string           // Item title
  description: string     // Detailed description
  category: string        // Category (jewelry, electronics, etc.)
  location: string        // Location where lost/found
  dateLost: string        // Date in format YYYY-MM-DD
  status: string          // Status: lost, found, claimed
  dateReported: string    // Date reported (auto-set)
  imageUrl: string        // URL to item image
  contactName: string     // Reporter's name
  contactEmail: string    // Reporter's email
  contactPhone: string    // Reporter's phone
}
```

### Status Values
- `lost` - Item has been reported as lost
- `found` - Item has been found
- `claimed` - Item has been claimed/resolved

### Category Values
- `electronics` - Electronic devices
- `jewelry` - Jewelry and accessories
- `clothing` - Clothing and apparel
- `documents` - Documents and papers
- `bag` - Bags and luggage
- `other` - Other items

---

## Error Responses

### 400 Bad Request
```json
{
  "timestamp": "2024-05-17T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid input parameters"
}
```

### 404 Not Found
```json
{
  "timestamp": "2024-05-17T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Item not found with id: 999"
}
```

### 500 Internal Server Error
```json
{
  "timestamp": "2024-05-17T10:30:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## CORS Configuration

The API allows requests from:
- `http://localhost:3000` (React frontend)

To add more origins, update `@CrossOrigin` in `ItemController.java`

---

## Rate Limiting

Currently, no rate limiting is implemented.
(Future enhancement: Add API rate limiting)

---

## Testing API Endpoints

### Using cURL

```bash
# Get all items
curl http://localhost:8080/api/items

# Get item by ID
curl http://localhost:8080/api/items/1

# Create new item
curl -X POST http://localhost:8080/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Item",
    "description": "Test description",
    "category": "jewelry",
    "location": "Test Location",
    "dateLost": "2024-05-15",
    "status": "lost",
    "contactName": "Test User",
    "contactEmail": "test@example.com",
    "contactPhone": "555-1234"
  }'

# Update status
curl -X PATCH http://localhost:8080/api/items/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "claimed"}'

# Delete item
curl -X DELETE http://localhost:8080/api/items/1
```

### Using Postman

1. Import the base URL: `http://localhost:8080/api`
2. Create requests for each endpoint
3. Set appropriate HTTP methods and body content
4. Send and view responses

### Using Browser Developer Tools

```javascript
// Get all items
fetch('http://localhost:8080/api/items')
  .then(response => response.json())
  .then(data => console.log(data));

// Create item
fetch('http://localhost:8080/api/items', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "Test Item",
    description: "Test",
    category: "jewelry",
    location: "Test",
    dateLost: "2024-05-15",
    status: "lost",
    contactName: "Test",
    contactEmail: "test@example.com",
    contactPhone: "555-1234"
  })
})
.then(r => r.json())
.then(d => console.log(d));
```

---

## Pagination (Future Enhancement)

Currently not implemented. Future versions may include:
- `?page=0&size=10` parameters
- Paginated responses with metadata

---

## Sorting (Future Enhancement)

Currently not implemented. Future versions may include:
- `?sort=dateReported,desc` parameters
- Multiple sort fields

---

## Filtering (Future Enhancement)

Currently implemented basic filtering. Future versions may include:
- Advanced search with multiple criteria
- Date range filtering
- Text search across description

---

## Change Log

### Version 1.0.0
- Initial API release
- Basic CRUD operations
- Status and category filtering
- CORS support

---

## Support

For API-related questions or bugs, refer to:
- `backend/README.md` - Backend specific documentation
- `INSTALLATION_GUIDE.md` - Setup and troubleshooting
