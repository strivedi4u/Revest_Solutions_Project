const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { OrderService } = require('./services/order.service');
const { OrderRepository } = require('./repositories/order.repository');

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
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Order Service API',
    description: 'Order Management Microservice - Process orders, track status, and manage inventory coordination',
    version: '1.0.0',
  },
  servers: [
    { url: 'http://localhost:3002', description: 'Development server' },
  ],
  paths: {
    '/orders': {
      post: {
        tags: ['Orders'],
        summary: 'Create a new order',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  userId: { type: 'string' },
                  items: { type: 'array' },
                  shippingAddress: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Order created successfully' },
          400: { description: 'Invalid product or insufficient stock' },
        },
      },
      get: {
        tags: ['Orders'],
        summary: 'Get all orders',
        responses: {
          200: { description: 'List of all orders' },
        },
      },
    },
    '/orders/{id}': {
      get: {
        tags: ['Orders'],
        summary: 'Get order by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Order found' },
          404: { description: 'Order not found' },
        },
      },
      put: {
        tags: ['Orders'],
        summary: 'Update order',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Order updated successfully' },
          404: { description: 'Order not found' },
        },
      },
      delete: {
        tags: ['Orders'],
        summary: 'Delete order',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Order deleted successfully' },
          404: { description: 'Order not found' },
        },
      },
    },
    '/orders/user/{userId}': {
      get: {
        tags: ['Orders'],
        summary: 'Get orders by user ID',
        parameters: [{ name: 'userId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'List of user orders' },
        },
      },
    },
  },
};

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.post('/api/orders', async (req, res) => {
  try {
    console.log('Creating order with body:', req.body);
    const order = await orderService.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(400).json({ error: error.message || 'Failed to create order' });
  }
});

app.get('/api/orders', (req, res) => {
  try {
    const orders = orderService.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/:id', (req, res) => {
  try {
    const order = orderService.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/user/:userId', (req, res) => {
  try {
    const orders = orderService.findByUserId(req.params.userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id', (req, res) => {
  try {
    const order = orderService.update(req.params.id, req.body);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/orders/:id', (req, res) => {
  try {
    const deleted = orderService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.ORDER_SERVICE_PORT || 3002;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/orders`);
  console.log(`Swagger UI available at http://localhost:${PORT}/swagger`);
});
