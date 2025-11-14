#!/bin/bash

echo "======================================"
echo "Microservices Application Startup"
echo "======================================"
echo ""

echo "Step 1: Installing backend dependencies..."
cd backend
npm install

echo "Step 2: Installing Product Service dependencies..."
cd apps/product-service
npm install
cd ../..

echo "Step 3: Installing Order Service dependencies..."
cd apps/order-service
npm install
cd ../..

echo "Step 4: Installing frontend dependencies..."
cd ../frontend
npm install

echo ""
echo "======================================"
echo "Installation Complete!"
echo "======================================"
echo ""
echo "To run the application:"
echo ""
echo "Terminal 1 - Product Service:"
echo "  cd backend/apps/product-service"
echo "  npm start"
echo ""
echo "Terminal 2 - Order Service:"
echo "  cd backend/apps/order-service"
echo "  npm start"
echo ""
echo "Terminal 3 - Frontend:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
