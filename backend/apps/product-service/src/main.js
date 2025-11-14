const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { ProductService } = require('./services/product.service');
const { ProductRepository } = require('./repositories/product.repository');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Set JSON response header for all API routes
app.use('/api', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Initialize services
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

// Add sample products on startup
productService.create({
  name: 'Laptop',
  price: 1000,
  quantity: 50,
});

productService.create({
  name: 'Mobile Phone',
  price: 500,
  quantity: 100,
});

productService.create({
  name: 'Tablet',
  price: 300,
  quantity: 75,
});

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Product Service API',
    description: 'Product Management Microservice - Manage product inventory, pricing, and stock levels',
    version: '1.0.0',
  },
  servers: [
    { url: 'http://localhost:3001', description: 'Development server' },
  ],
  paths: {
    '/products': {
      post: {
        tags: ['Products'],
        summary: 'Create a new product',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  price: { type: 'number' },
                  quantity: { type: 'number' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Product created successfully' },
        },
      },
      get: {
        tags: ['Products'],
        summary: 'Get all products',
        responses: {
          200: { description: 'List of all products' },
        },
      },
    },
    '/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Get product by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Product found' },
          404: { description: 'Product not found' },
        },
      },
      put: {
        tags: ['Products'],
        summary: 'Update product',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Product updated successfully' },
          404: { description: 'Product not found' },
        },
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete product',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Product deleted successfully' },
          404: { description: 'Product not found' },
        },
      },
    },
    '/products/{id}/stock': {
      get: {
        tags: ['Products'],
        summary: 'Get product stock level',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Stock level retrieved' },
        },
      },
    },
    '/products/{id}/decrement-stock': {
      post: {
        tags: ['Products'],
        summary: 'Decrement product stock',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { quantity: { type: 'number' } } },
            },
          },
        },
        responses: {
          200: { description: 'Stock decremented successfully' },
          400: { description: 'Insufficient stock or product not found' },
        },
      },
    },
  },
};

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.post('/api/products', (req, res) => {
  try {
    const product = productService.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/products', (req, res) => {
  try {
    const products = productService.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const product = productService.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const product = productService.update(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const deleted = productService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id/stock', (req, res) => {
  try {
    const stock = productService.getStock(req.params.id);
    res.status(200).json({ id: req.params.id, stock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products/:id/decrement-stock', (req, res) => {
  try {
    const success = productService.decrementStock(req.params.id, req.body.quantity);
    if (!success) {
      return res.status(400).json({ error: 'Insufficient stock or product not found' });
    }
    res.status(200).json({ message: 'Stock decremented successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PRODUCT_SERVICE_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/products`);
  console.log(`Swagger UI available at http://localhost:${PORT}/swagger`);
});
