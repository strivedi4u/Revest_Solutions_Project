import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
  Tab,
  Tabs,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const API_PRESETS = {
  product: [
    {
      name: 'Get All Products',
      method: 'GET',
      url: 'http://localhost:3001/api/products',
      body: '',
    },
    {
      name: 'Create Product',
      method: 'POST',
      url: 'http://localhost:3001/api/products',
      body: JSON.stringify(
        {
          name: 'Laptop',
          price: 1000,
          stock: 50,
        },
        null,
        2
      ),
    },
    {
      name: 'Get Product by ID',
      method: 'GET',
      url: 'http://localhost:3001/api/products/1',
      body: '',
    },
    {
      name: 'Update Product',
      method: 'PUT',
      url: 'http://localhost:3001/api/products/1',
      body: JSON.stringify(
        {
          name: 'Updated Laptop',
          price: 1200,
          stock: 60,
        },
        null,
        2
      ),
    },
    {
      name: 'Delete Product',
      method: 'DELETE',
      url: 'http://localhost:3001/api/products/1',
      body: '',
    },
  ],
  order: [
    {
      name: 'Get All Orders',
      method: 'GET',
      url: 'http://localhost:3002/api/orders',
      body: '',
    },
    {
      name: 'Create Order',
      method: 'POST',
      url: 'http://localhost:3002/api/orders',
      body: JSON.stringify(
        {
          userId: 'user1',
          items: [
            {
              productId: '1',
              quantity: 5,
            },
          ],
          shippingAddress: '123 Main Street, City, Country',
        },
        null,
        2
      ),
    },
    {
      name: 'Get Order by ID',
      method: 'GET',
      url: 'http://localhost:3002/api/orders/1',
      body: '',
    },
    {
      name: 'Update Order',
      method: 'PUT',
      url: 'http://localhost:3002/api/orders/1',
      body: JSON.stringify(
        {
          items: [
            {
              productId: '1',
              quantity: 10,
            },
          ],
          shippingAddress: 'Updated Address',
        },
        null,
        2
      ),
    },
    {
      name: 'Delete Order',
      method: 'DELETE',
      url: 'http://localhost:3002/api/orders/1',
      body: '',
    },
  ],
};

export default function ApiTester() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('http://localhost:3001/api/products');
  const [body, setBody] = useState('');
  const [headers, setHeaders] = useState('Content-Type: application/json');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleSendRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setStatusCode(null);
    setResponseTime(null);

    try {
      const startTime = Date.now();

      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const endTime = Date.now();

      setStatusCode(res.status);
      setResponseTime(endTime - startTime);

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const jsonData = await res.json();
        setResponse(JSON.stringify(jsonData, null, 2));
      } else {
        setError('Response is not JSON. Expected JSON format.');
        setResponse(null);
      }

      if (!res.ok) {
        setError(`HTTP ${res.status}: ${res.statusText}`);
      }
    } catch (err) {
      setError(err.message);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadPreset = (preset) => {
    setMethod(preset.method);
    setUrl(preset.url);
    setBody(preset.body);
    setResponse(null);
    setStatusCode(null);
    setResponseTime(null);
    setError(null);
  };

  const handleClearAll = () => {
    setMethod('GET');
    setUrl('http://localhost:3001/api/products');
    setBody('');
    setHeaders('Content-Type: application/json');
    setResponse(null);
    setStatusCode(null);
    setResponseTime(null);
    setError(null);
  };

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      setCopiedIndex(1);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const getStatusColor = (code) => {
    if (code >= 200 && code < 300) return '#4caf50';
    if (code >= 300 && code < 400) return '#2196f3';
    if (code >= 400 && code < 500) return '#ff9800';
    return '#f44336';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          API Tester
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Test Product & Order Service APIs
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Request Builder */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Request
            </Typography>

            {/* Method & URL */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <FormControl sx={{ minWidth: 100 }}>
                <Select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  size="small"
                >
                  <MenuItem value="GET">GET</MenuItem>
                  <MenuItem value="POST">POST</MenuItem>
                  <MenuItem value="PUT">PUT</MenuItem>
                  <MenuItem value="DELETE">DELETE</MenuItem>
                  <MenuItem value="PATCH">PATCH</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                size="small"
                variant="outlined"
              />
            </Box>

            {/* Body */}
            {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
              <>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Body (JSON)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  variant="outlined"
                  placeholder="Enter JSON body"
                  sx={{ mb: 2, fontFamily: 'monospace' }}
                />
              </>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handleSendRequest}
                disabled={loading}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  flex: 1,
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Send Request'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={handleClearAll}
              >
                Clear
              </Button>
            </Box>

            {/* Presets */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
              Quick Presets
            </Typography>

            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              sx={{ mb: 2 }}
            >
              <Tab label="Product Service" />
              <Tab label="Order Service" />
            </Tabs>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1 }}>
              {(tabValue === 0 ? API_PRESETS.product : API_PRESETS.order).map(
                (preset, idx) => (
                  <Button
                    key={idx}
                    variant="outlined"
                    size="small"
                    onClick={() => handleLoadPreset(preset)}
                    sx={{
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      textTransform: 'none',
                    }}
                  >
                    <Box>
                      <Typography variant="caption" display="block">
                        {preset.method}
                      </Typography>
                      <Typography variant="caption">{preset.name}</Typography>
                    </Box>
                  </Button>
                )
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Response */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Response
            </Typography>

            {/* Status & Time */}
            {statusCode !== null && (
              <Box sx={{ mb: 2, p: 1.5, backgroundColor: '#fff', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Status Code
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        color: getStatusColor(statusCode),
                      }}
                    >
                      {statusCode}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" color="textSecondary">
                      Response Time
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {responseTime}ms
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Error Message */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Response Body */}
            {response && (
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    Response Body
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<ContentCopyIcon />}
                    onClick={handleCopyResponse}
                  >
                    {copiedIndex === 1 ? 'Copied!' : 'Copy'}
                  </Button>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  value={response}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-root': {
                      fontFamily: 'monospace',
                    },
                  }}
                />
              </Box>
            )}

            {/* Empty State */}
            {!response && !error && statusCode === null && (
              <Card sx={{ backgroundColor: '#fff', border: '2px dashed #ccc' }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="textSecondary">
                    Send a request to see the response
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Service Status */}
      <Paper
        sx={{
          p: 3,
          mt: 4,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Services Available
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#e8f5e9' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Product Service
                </Typography>
                <Typography variant="body2">
                  <strong>Port:</strong> 3001
                </Typography>
                <Typography variant="body2">
                  <strong>Base URL:</strong> http://localhost:3001
                </Typography>
                <Typography variant="body2">
                  <strong>Swagger:</strong> /api
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#e3f2fd' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Order Service
                </Typography>
                <Typography variant="body2">
                  <strong>Port:</strong> 3002
                </Typography>
                <Typography variant="body2">
                  <strong>Base URL:</strong> http://localhost:3002
                </Typography>
                <Typography variant="body2">
                  <strong>Swagger:</strong> /api
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
