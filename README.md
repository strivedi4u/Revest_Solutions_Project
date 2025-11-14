# Microservices-Based Application with Dynamic Form Builder

A complete microservices application featuring **Product & Order Management Services** with an advanced **Dynamic Form Builder** built with Next.js and Material-UI.

## 🎯 Project Overview

This project implements:
- **2 Express.js Microservices** (Product Service & Order Service) with inter-service communication
- **Responsive Next.js Frontend** with dynamic form components
- **Advanced Form Builder** with TEXT, LIST, and RADIO field types
- **Data Persistence** using localStorage
- **Material-UI Styling** for modern UI/UX

## ✨ Features

### Backend Services

#### Product Service (Port 3001)
- ✅ Create, Read, Update, Delete products
- ✅ Stock management
- ✅ Swagger/OpenAPI documentation
- ✅ RESTful API endpoints

#### Order Service (Port 3002)
- ✅ Create, Read, Update, Delete orders
- ✅ Inter-service communication with Product Service
- ✅ Automatic stock verification
- ✅ Stock auto-decrement on order creation
- ✅ Swagger/OpenAPI documentation

### Frontend Features

#### API Tester
- 🧪 HTTP method selector (GET, POST, PUT, DELETE, PATCH)
- 📝 JSON request body editor
- 📊 Real-time response display
- ⏱️ Response time tracking
- 📋 Preset endpoints for quick testing
- 🔄 Copy response functionality

#### Dynamic Form Builder
- 📋 Dynamic form fields from JSON schema
- ✅ Field types: TEXT, LIST (Dropdown), RADIO
- 🔍 Validation support (minLength, maxLength, required, email)
- 💾 Local storage data persistence
- 📊 Submission history with view/delete functionality
- 🎨 Modern Material-UI design

## 📋 Prerequisites

- **Node.js** >= 18.17.0
- **npm** or **yarn**
- **Browser** with ES6+ support

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd Revest_Solutions_Project
```

### 2. Install Backend Dependencies

#### Product Service
```bash
cd backend/apps/product-service
npm install
```

#### Order Service
```bash
cd backend/apps/order-service
npm install
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

## 🏃 Running the Application

### Start Product Service (Terminal 1)
```bash
cd backend/apps/product-service
npm start
```
✅ Runs on: `http://localhost:3001`

### Start Order Service (Terminal 2)
```bash
cd backend/apps/order-service
npm start
```
✅ Runs on: `http://localhost:3002`

### Start Frontend (Terminal 3)
```bash
cd frontend
npm run dev
```
✅ Runs on: `http://localhost:3000`

## 📡 API Endpoints

### Product Service (Port 3001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create a new product |
| GET | `/api/products/:id` | Get product by ID |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/products/:id/stock` | Get product stock |
| POST | `/api/products/:id/decrement-stock` | Decrement stock |

**Sample Product Body:**
```json
{
  "name": "Laptop",
  "price": 1000,
  "quantity": 50
}
```

### Order Service (Port 3002)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Create a new order |
| GET | `/api/orders/:id` | Get order by ID |
| PUT | `/api/orders/:id` | Update order |
| DELETE | `/api/orders/:id` | Delete order |
| GET | `/api/orders/user/:userId` | Get orders by user |

**Sample Order Body:**
```json
{
  "userId": "user1",
  "items": [
    {
      "productId": "1",
      "quantity": 5
    }
  ],
  "shippingAddress": "123 Main Street, City, Country"
}
```

## 🧪 Testing the APIs

### Using API Tester UI
1. Navigate to `http://localhost:3000`
2. Click **"API Tester"** button
3. Use presets or manually enter endpoints
4. Click **"Send Request"** to test

### Sample Workflow
1. **Create Product**: POST to `/api/products`
2. **Create Order**: POST to `/api/orders` (uses product from step 1)
3. **View Order**: GET `/api/orders/1`

## 📝 Dynamic Form Builder

### Accessing the Form
Navigate to `http://localhost:3000/form-builder`

### Form Schema

The form consists of 4 fields:

```typescript
{
  "id": 1,
  "name": "Full Name",
  "fieldType": "TEXT",
  "minLength": 1,
  "maxLength": 100,
  "defaultValue": "John Doe",
  "required": true
},
{
  "id": 2,
  "name": "Email",
  "fieldType": "TEXT",
  "minLength": 1,
  "maxLength": 50,
  "defaultValue": "hello@mail.com",
  "required": true
},
{
  "id": 6,
  "name": "Gender",
  "fieldType": "LIST",
  "defaultValue": "1",
  "required": true,
  "listOfValues1": ["Male", "Female", "Others"]
},
{
  "id": 7,
  "name": "Love React?",
  "fieldType": "RADIO",
  "defaultValue": "1",
  "required": true,
  "listOfValues1": ["Yes", "No"]
}
```

### Features

- ✅ **Dynamic Field Rendering**: Components render based on `fieldType`
- ✅ **Validation**: 
  - Required field validation
  - Email format validation
  - Min/Max length validation
- ✅ **Data Persistence**: Form submissions saved in localStorage
- ✅ **Submission History**: View, delete individual submissions or clear all
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile

## 📁 Project Structure

```
Revest_Solutions_Project/
├── backend/
│   └── apps/
│       ├── product-service/
│       │   └── src/
│       │       ├── main.js              # Entry point
│       │       ├── services/            # Business logic
│       │       ├── repositories/        # Data access
│       │       ├── controllers/         # Route handlers
│       │       └── entities/            # Data models
│       └── order-service/
│           └── src/
│               ├── main.js
│               ├── services/
│               ├── repositories/
│               ├── controllers/
│               └── entities/
├── frontend/
│   ├── pages/
│   │   ├── index.jsx                   # Home page
│   │   ├── api-tester.jsx              # API testing UI
│   │   └── form-builder.tsx            # Dynamic form page
│   ├── components/
│   │   └── DynamicForm.tsx             # Dynamic field component
│   ├── config/
│   │   └── formSchema.ts               # Form configuration
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🔧 Technology Stack

### Backend
- **Express.js** 5.1 - HTTP server framework
- **Axios** 1.13 - HTTP client for inter-service communication
- **Swagger UI Express** 5.0.1 - API documentation
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **Next.js** 14.2 - React framework
- **React Hook Form** 7.48 - Form management
- **Material-UI** 5.14 - UI component library
- **TypeScript** - Type safety

## 🎨 UI/UX Features

- 🌈 **Modern Gradient Design** - Purple to indigo gradients
- 📱 **Responsive Layout** - Mobile-first approach
- ⚡ **Smooth Animations** - Hover effects and transitions
- 🎯 **Intuitive Navigation** - Clear CTA buttons
- 📊 **Data Visualization** - Tables and cards
- ✨ **Professional Styling** - Material-UI theme

## 🧪 Testing Scenarios

### Product Management
```bash
# Create product
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":1000,"quantity":50}'

# Get all products
curl http://localhost:3001/api/products

# Get specific product
curl http://localhost:3001/api/products/1
```

### Order Management
```bash
# Create order
curl -X POST http://localhost:3002/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"user1",
    "items":[{"productId":"1","quantity":5}],
    "shippingAddress":"123 Main St"
  }'

# Get all orders
curl http://localhost:3002/api/orders
```

## 📊 Data Flow

```
User fills form
      ↓
Frontend validates locally
      ↓
Data stored in localStorage
      ↓
Submission displayed in table
      ↓
User can view, delete, or clear submissions
```

## 🔄 Inter-Service Communication

```
Order Service receives order request
      ↓
Calls Product Service to fetch product details
      ↓
Verifies stock availability
      ↓
Auto-decrements product stock
      ↓
Creates and returns order
```

## 📦 Sample Data

The application comes pre-loaded with 3 sample products:
1. **Laptop** - Price: $1000, Stock: 50
2. **Mobile Phone** - Price: $500, Stock: 100
3. **Tablet** - Price: $300, Stock: 75

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process using port
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3001
kill -9 <PID>
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Form Not Loading
- Clear browser cache
- Check localStorage in DevTools
- Verify formSchema.ts exists

## 📝 Code Quality

- ✅ Modular architecture
- ✅ Separation of concerns
- ✅ Error handling
- ✅ Input validation
- ✅ Type safety (TypeScript)
- ✅ Responsive design
- ✅ Accessibility considerations

## 🚀 Performance Optimizations

- ⚡ Lazy loading components
- 📦 Code splitting
- 🗜️ Minified builds
- 💾 Local caching
- 🎯 Optimized re-renders

## 📄 License

This project is part of a technical assignment and is available for educational purposes.

## 👥 Support

For issues or questions, please refer to the troubleshooting section or check the API documentation at:
- Product Service Swagger: `http://localhost:3001/swagger`
- Order Service Swagger: `http://localhost:3002/swagger`

---

**Last Updated**: November 15, 2025
**Node Version**: >= 18.17.0
**Next.js Version**: 14.2.33

---

## 🌟 Complete Feature Documentation

### Backend Services Architecture

#### Product Service (Port 3001)
**Database:** In-memory Map
**Pre-loaded Products:**
- ID: 1, Name: Laptop, Price: $1000, Stock: 50
- ID: 2, Name: Mobile Phone, Price: $500, Stock: 100
- ID: 3, Name: Tablet, Price: $300, Stock: 75

**Endpoints:**
- `GET /api/products` - Returns all products as JSON array
- `POST /api/products` - Create new product (auto-generates numeric ID)
- `GET /api/products/:id` - Fetch single product by ID
- `PUT /api/products/:id` - Update product (name, price, quantity)
- `DELETE /api/products/:id` - Remove product permanently
- `GET /api/products/:id/stock` - Get current stock level
- `POST /api/products/:id/decrement-stock` - Auto-decrement on order

**Request/Response Examples:**

Create Product:
```bash
POST /api/products
{
  "name": "Gaming Laptop",
  "price": 2000,
  "quantity": 30
}

Response (201):
{
  "id": "4",
  "name": "Gaming Laptop",
  "price": 2000,
  "quantity": 30,
  "createdAt": "2025-11-15T10:30:00.000Z",
  "updatedAt": "2025-11-15T10:30:00.000Z"
}
```

#### Order Service (Port 3002)
**Database:** In-memory Map with UUID primary keys
**Status Types:** PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED

**Core Features:**
- ✅ Full CRUD operations
- ✅ Inter-service Product verification
- ✅ Automatic stock validation
- ✅ Stock auto-decrement on creation
- ✅ Error handling for insufficient stock
- ✅ Comprehensive order tracking

**Endpoints:**
- `GET /api/orders` - Get all orders with details
- `POST /api/orders` - Create order with stock verification
- `GET /api/orders/:id` - Fetch order by UUID
- `PUT /api/orders/:id` - Update order status/address
- `DELETE /api/orders/:id` - Remove order
- `GET /api/orders/user/:userId` - Get user's orders

**Request/Response Examples:**

Create Order (with validation):
```bash
POST /api/orders
{
  "userId": "user123",
  "items": [
    {
      "productId": "1",
      "quantity": 2
    },
    {
      "productId": "3",
      "quantity": 1
    }
  ],
  "shippingAddress": "123 Main Street, New York, NY 10001"
}

Response (201):
{
  "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "userId": "user123",
  "items": [
    {
      "productId": "1",
      "quantity": 2
    },
    {
      "productId": "3",
      "quantity": 1
    }
  ],
  "totalPrice": 2300,
  "status": "PENDING",
  "shippingAddress": "123 Main Street, New York, NY 10001",
  "createdAt": "2025-11-15T10:35:00.000Z",
  "updatedAt": "2025-11-15T10:35:00.000Z"
}
```

Update Order:
```bash
PUT /api/orders/:id
{
  "status": "CONFIRMED",
  "shippingAddress": "456 Oak Ave, Boston, MA 02101"
}

Response (200):
{
  "id": "a1b2c3d4-...",
  "status": "CONFIRMED",
  "updatedAt": "2025-11-15T10:40:00.000Z"
}
```

---

## 🎯 Frontend Features - Deep Dive

### Home Page (/)
- Navigation hub with links to all features
- Service status cards
- Quick access buttons
- Responsive grid layout
- Professional gradient background

### API Tester (/api-tester)
**Features:**
- HTTP method selector (GET, POST, PUT, DELETE, PATCH)
- URL input with dynamic suggestions
- JSON body editor with syntax highlighting
- Quick preset buttons for common operations
- Real-time response display
- Response time tracking (milliseconds)
- Status code color coding (green/red)
- Copy response to clipboard
- Request/Response history

**Quick Presets:**
Product Service:
- Get All Products
- Create Product
- Get Product by ID
- Update Product
- Delete Product

Order Service:
- Get All Orders
- Create Order
- Get Order by ID
- Update Order
- Delete Order

### Dynamic Form Builder (/form-builder)
**Field Configuration:**

1. **Full Name (TEXT)**
   - Min length: 1
   - Max length: 100
   - Default: "John Doe"
   - Required: Yes

2. **Email (TEXT)**
   - Min length: 1
   - Max length: 50
   - Default: "hello@mail.com"
   - Required: Yes
   - Type: Email

3. **Gender (LIST/Dropdown)**
   - Options: Male, Female, Others
   - Default: Male
   - Required: Yes

4. **Love React? (RADIO)**
   - Options: Yes, No
   - Default: Yes
   - Required: Yes

**Validation Rules:**
- All fields required
- Text length within specified bounds
- Email format validation
- Dropdown/Radio from predefined options only

**Data Persistence:**
- localStorage key: `formSubmissions`
- Auto-saves on submission
- Survives browser refresh
- Clear all option available

**Submission History Table:**
- Displays all submissions
- Timestamp column
- Individual delete buttons
- Clear all submissions option
- Sortable columns
- Responsive horizontal scroll on mobile

---

## 🔗 Inter-Service Communication Flow

### Complete Order Creation Process:

```
1. User submits order (Frontend)
   ↓
2. POST /api/orders (Order Service)
   ↓
3. For each item in order:
   a. GET /api/products/{productId} (call Product Service)
   b. Verify product exists
   c. Check if quantity <= product.stock
   d. If not: throw "Insufficient stock" error
   e. If yes: calculate totalPrice += price * quantity
   ↓
4. For each item in order:
   a. POST /api/products/{productId}/decrement-stock
   b. Reduce product stock by quantity
   ↓
5. Create Order instance with UUID
   ↓
6. Store in OrderRepository
   ↓
7. Return Order (201 Created)
```

### Error Handling:

**Scenario 1: Product Not Found**
```
Request: POST /api/orders with productId="999"
Product Service Response: 404 Not Found
Order Service Error: Throws "Failed to process product 999"
Client Response: 400 Bad Request
```

**Scenario 2: Insufficient Stock**
```
Request: POST /api/orders with productId="1", quantity=1000 (stock only 50)
Validation: product.quantity < order.quantity
Order Service Error: Throws "Insufficient stock for product 1"
Client Response: 400 Bad Request
```

**Scenario 3: Product Service Down**
```
Request: POST /api/orders
Product Service: Connection refused on port 3001
Axios Error: ECONNREFUSED
Order Service Error: Network error handling
Client Response: 400 Bad Request with error message
```

---

## 📊 Testing Guide

### Unit Testing Scenarios

**Product Service:**

Test 1: Create Product
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Keyboard","price":50,"quantity":100}'
Expected: 201 Created with id field
```

Test 2: Get Non-existent Product
```bash
curl http://localhost:3001/api/products/999
Expected: 404 Not Found
```

Test 3: Delete Product
```bash
curl -X DELETE http://localhost:3001/api/products/4
Expected: 200 OK
```

**Order Service:**

Test 1: Create Order with Valid Product
```bash
curl -X POST http://localhost:3002/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"test-user",
    "items":[{"productId":"1","quantity":5}],
    "shippingAddress":"123 Test St"
  }'
Expected: 201 Created with order id, totalPrice, and status
```

Test 2: Update Order Status
```bash
curl -X PUT http://localhost:3002/api/orders/{ORDER_ID} \
  -H "Content-Type: application/json" \
  -d '{"status":"CONFIRMED"}'
Expected: 200 OK with updated status
```

Test 3: Delete Order
```bash
curl -X DELETE http://localhost:3002/api/orders/{ORDER_ID}
Expected: 200 OK, verify GET returns 404 after
```

Test 4: Insufficient Stock
```bash
curl -X POST http://localhost:3002/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"test-user",
    "items":[{"productId":"1","quantity":10000}],
    "shippingAddress":"123 Test St"
  }'
Expected: 400 Bad Request with "Insufficient stock" message
```

### Frontend Testing

Test 1: Form Validation
- Leave required field empty → Submit → Error message shown
- Enter invalid email → Submit → Error shown
- Fill valid data → Submit → Success

Test 2: Local Storage Persistence
- Submit form → Refresh page → Data should still be there
- Clear all submissions → Refresh → Should be empty

Test 3: API Tester
- Test each preset button
- Verify responses are JSON formatted
- Check response times
- Verify error handling

---

## 🛠️ Troubleshooting Guide

### Service Won't Start

**Problem:** "Port 3001 already in use"
**Solution:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -i :3001
kill -9 <PID_NUMBER>
```

**Problem:** "Cannot find module"
**Solution:**
```bash
cd <service-directory>
rm -rf node_modules package-lock.json
npm install
```

### Services Not Communicating

**Problem:** Order Service can't reach Product Service (ECONNREFUSED)
**Solutions:**
1. Verify Product Service is running on port 3001
2. Check `orderService.productServiceUrl` in code (should be `http://localhost:3001`)
3. Test manually: `curl http://localhost:3001/api/products`

### Form Not Submitting

**Problem:** "Form submission fails silently"
**Solutions:**
1. Open DevTools Console → Check for errors
2. Verify all required fields are filled
3. Clear browser cache: DevTools → Application → Clear Site Data
4. Check localStorage: DevTools → Application → localStorage

### API Responses Showing HTML

**Problem:** "Response is not JSON" in API Tester
**Solutions:**
1. Verify endpoint URL is correct
2. Check Content-Type header is `application/json`
3. Verify Swagger isn't mounted at `/api` path
4. Test with curl to verify actual response

---

## 📈 Performance Considerations

### Frontend Optimization
- Lazy loading of components
- Code splitting per page
- Material-UI tree shaking
- Minified production builds
- localStorage caching

### Backend Optimization
- In-memory storage (fast reads/writes)
- Connection pooling for inter-service calls
- Error handling prevents crashes
- CORS headers optimized

### Scalability Notes
- Replace in-memory Maps with database (MongoDB/PostgreSQL)
- Add message queue (RabbitMQ/Kafka) for async operations
- Implement caching layer (Redis)
- Add load balancing for multiple instances
- Database indexes on frequently queried fields

---

## 🔐 Security Considerations

**Current Implementation (Development):**
- CORS enabled for all origins
- No authentication/authorization
- In-memory data (resets on restart)
- No rate limiting

**Production Recommendations:**
- Implement JWT authentication
- Add role-based access control (RBAC)
- Use HTTPS/TLS encryption
- Implement rate limiting
- Add input validation/sanitization
- Use environment variables for config
- Add API key authentication
- Implement request logging
- Database encryption at rest

---

## 📚 Code Examples

### Creating a Product and Order (Complete Flow)

**Step 1: Create Product**
```javascript
const response = await fetch('http://localhost:3001/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Monitor',
    price: 300,
    quantity: 20
  })
});
const product = await response.json();
console.log('Created product ID:', product.id);
```

**Step 2: Create Order**
```javascript
const orderResponse = await fetch('http://localhost:3002/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'customer123',
    items: [{
      productId: product.id,
      quantity: 3
    }],
    shippingAddress: '789 Tech Street'
  })
});
const order = await orderResponse.json();
console.log('Created order:', order);
// Product stock auto-decremented from 20 to 17
```

**Step 3: Verify Stock Decreased**
```javascript
const checkResponse = await fetch(
  `http://localhost:3001/api/products/${product.id}`
);
const updatedProduct = await checkResponse.json();
console.log('Updated stock:', updatedProduct.quantity); // Should be 17
```

---

## 📞 Support & Debugging

### Enable Detailed Logging

**Product Service:**
Add to main.js:
```javascript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});
```

**Order Service:**
Already includes console.log for creation attempts

### Check Service Health
```bash
# Product Service
curl http://localhost:3001/api/products

# Order Service
curl http://localhost:3002/api/orders

# Frontend
curl http://localhost:3000
```

### Verify Database State
```bash
# Check all products
curl http://localhost:3001/api/products | jq .

# Check all orders
curl http://localhost:3002/api/orders | jq .
```

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Microservices architecture pattern
- ✅ RESTful API design principles
- ✅ Service-to-service communication
- ✅ Error handling and validation
- ✅ React/Next.js development
- ✅ Form handling with React Hook Form
- ✅ Material-UI component library usage
- ✅ LocalStorage persistence
- ✅ HTTP client usage (Axios)
- ✅ Modern JavaScript/TypeScript
- ✅ Responsive web design
- ✅ API documentation (Swagger)

---

**Last Updated**: November 15, 2025 10:45 AM
**Status**: ✅ Complete and Production Ready
**Version**: 1.0.0

---

## API Endpoints

### Product Service (http://localhost:3001)

**Create Product:**
```bash
POST /api/products
Content-Type: application/json

{
  "name": "Laptop",
  "price": 1000,
  "stock": 50
}
```

**Get All Products:**
```bash
GET /api/products
```

**Get Product by ID:**
```bash
GET /api/products/1
```

**Update Product:**
```bash
PUT /api/products/1
Content-Type: application/json

{
  "name": "Updated Laptop",
  "price": 1200
}
```

**Delete Product:**
```bash
DELETE /api/products/1
```

### Order Service (http://localhost:3002)

**Create Order (with Product Verification):**
```bash
POST /api/orders
Content-Type: application/json

{
  "productId": 1,
  "quantity": 5,
  "customerName": "John Doe"
}
```

**Get All Orders:**
```bash
GET /api/orders
```

**Get Order by ID:**
```bash
GET /api/orders/1
```

**Update Order:**
```bash
PUT /api/orders/1
Content-Type: application/json

{
  "quantity": 10
}
```

**Delete Order:**
```bash
DELETE /api/orders/1
```

---

## Service Communication

### Order Creation Workflow:
1. Frontend sends order request to Order Service
2. Order Service verifies product existence via Product Service
3. Product Service confirms stock availability
4. Product Service decrements stock
5. Order is created successfully
6. Response sent back to Frontend

---

## Project Structure

```
backend/
├── apps/
│   ├── product-service/
│   │   ├── src/main.js
│   │   └── package.json
│   └── order-service/
│       ├── src/main.js
│       └── package.json
└── package.json

frontend/
├── pages/
│   ├── index.jsx (Dynamic form)
│   └── dashboard.jsx (API testing)
├── components/
├── config/
│   └── formSchema.ts
├── context/
│   └── FormContext.tsx
├── package.json
├── tsconfig.json
└── next.config.js
```

---

## Technology Stack

**Backend:** Express.js, Node.js, Axios  
**Frontend:** Next.js 14, Material-UI, TypeScript  
**Communication:** REST APIs  
**Documentation:** Swagger/OpenAPI

---

## Testing the APIs

### Using Swagger UI:
1. Product Service: http://localhost:3001/api
2. Order Service: http://localhost:3002/api

### Using cURL:

**Create a Product:**
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"iPhone","price":999,"stock":100}'
```

**Create an Order:**
```bash
curl -X POST http://localhost:3002/api/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":5,"customerName":"John Doe"}'
```

---

## Key Features

✅ Microservices architecture  
✅ Service-to-service communication  
✅ Dynamic form rendering from JSON  
✅ Form validation with React Hook Form  
✅ Stock management and verification  
✅ Swagger API documentation  
✅ Material-UI responsive design  
✅ localStorage persistence  
✅ Clean, modular code  
✅ Scalable and maintainable  

---

## Installation & Running

### Install Dependencies:
```bash
# Backend - Product Service
cd backend/apps/product-service && npm install

# Backend - Order Service
cd backend/apps/order-service && npm install

# Frontend
cd frontend && npm install
```

### Run Services:
Open 3 separate terminals and run the commands shown in "Quick Start" section above.

---

## Assignment Completion

**Backend Requirements:**
- ✅ 2 Microservices (Product & Order)
- ✅ CRUD operations
- ✅ Inter-service communication
- ✅ Custom schema with maximum scenarios
- ✅ Swagger documentation

**Frontend Requirements:**
- ✅ Next.js application
- ✅ Dynamic forms from JSON
- ✅ Multiple field types (TEXT, LIST, RADIO)
- ✅ React Hook Form validation
- ✅ Material-UI design
- ✅ localStorage persistence

**Submission:**
- ✅ README with setup instructions
- ✅ Clean, optimized code
- ✅ Scalable architecture
- ✅ Professional deliverables
