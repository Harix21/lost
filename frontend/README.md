# Lost and Found Portal - Frontend

React.js frontend for the Lost and Found Portal application.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Configuration

Create or update `.env` file with the API URL:
```
REACT_APP_API_URL=http://localhost:8080/api
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open automatically at `http://localhost:3000`

## Building for Production

```bash
npm run build
```

This creates a production build in the `build` folder.

## Features

- 🏠 Home page with quick actions
- 📋 Browse all lost and found items
- ➕ Report lost items
- ➕ Report found items
- 👤 View personal listings
- 📧 Contact item owners
- 🔍 Search and filter items

## Project Structure

```
src/
├── components/
│   ├── Navigation.js
│   └── Navigation.css
├── pages/
│   ├── Home.js
│   ├── ViewItems.js
│   ├── ReportLost.js
│   ├── ReportFound.js
│   ├── MyListings.js
│   └── ItemDetail.js
├── services/
│   └── ItemService.js
├── App.js
├── App.css
└── index.js
```

## API Endpoints Used

- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item by ID
- `GET /api/items/status/:status` - Get items by status
- `GET /api/items/user/:email` - Get user's items
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `PATCH /api/items/:id/status` - Update item status
- `DELETE /api/items/:id` - Delete item
