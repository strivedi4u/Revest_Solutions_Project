import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Box, Paper, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ApiIcon from '@mui/icons-material/Api';
import StorageIcon from '@mui/icons-material/Storage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Microservices API Tester</title>
        <meta name="description" content="Test Product and Order APIs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: 6,
            borderRadius: 2,
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, mb: 2, fontWeight: 'bold' }}>
            Microservices Application
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            API Testing & Dynamic Form Builder
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/api-tester" passHref>
              <Button
                variant="contained"
                size="large"
                startIcon={<ApiIcon />}
                sx={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  px: 4,
                  py: 1.5,
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
              >
                API Tester
              </Button>
            </Link>
            <Link href="/form-builder" passHref>
              <Button
                variant="contained"
                size="large"
                startIcon={<AutoAwesomeIcon />}
                sx={{
                  backgroundColor: '#ff9800',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  px: 4,
                  py: 1.5,
                  '&:hover': { backgroundColor: '#f57c00' },
                }}
              >
                Form Builder
              </Button>
            </Link>
          </Box>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent>
                <ApiIcon sx={{ fontSize: 40, color: '#667eea', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Product Service
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Port:</strong> 3001
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  CRUD operations for product management
                </Typography>
                <Typography variant="caption">
                  URL: http://localhost:3001/api
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent>
                <StorageIcon sx={{ fontSize: 40, color: '#764ba2', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Order Service
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Port:</strong> 3002
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  CRUD operations for order management
                </Typography>
                <Typography variant="caption">
                  URL: http://localhost:3002/api
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent>
                <AutoAwesomeIcon sx={{ fontSize: 40, color: '#f44336', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Inter-Service Communication
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Order Service communicates with Product Service
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Stock verification & auto-decrement
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* API Endpoints */}
        <Paper sx={{ p: 4, mb: 4, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            Quick API Reference
          </Typography>

          <Grid container spacing={3}>
            {/* Product Service */}
            <Grid item xs={12} md={6}>
              <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 1, border: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#667eea' }}>
                  Product Service Endpoints
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                  POST /api/products - Create product
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                  GET /api/products - Get all products
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                  GET /api/products/:id - Get product by ID
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                  PUT /api/products/:id - Update product
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  DELETE /api/products/:id - Delete product
                </Typography>
              </Box>
            </Grid>

            {/* Order Service */}
            <Grid item xs={12} md={6}>
              <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 1, border: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#764ba2' }}>
                  Order Service Endpoints
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                  POST /api/orders - Create order
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                  GET /api/orders - Get all orders
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                  GET /api/orders/:id - Get order by ID
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                  PUT /api/orders/:id - Update order
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  DELETE /api/orders/:id - Delete order
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Instructions */}
        <Paper sx={{ p: 4, backgroundColor: '#e8f5e9' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            How to Use
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            1. Click "Open API Tester" button above
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            2. Select HTTP method (GET, POST, PUT, DELETE)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            3. Enter the API endpoint URL
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            4. For POST/PUT requests, enter JSON body
          </Typography>
          <Typography variant="body2">
            5. Click "Send Request" to test the API
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
