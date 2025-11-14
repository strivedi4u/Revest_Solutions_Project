const { v4: uuidv4 } = require('uuid');

const OrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
};

class Order {
  constructor(data = {}) {
    this.id = data.id || uuidv4();
    this.userId = data.userId;
    this.items = data.items || [];
    this.status = data.status || OrderStatus.PENDING;
    this.totalPrice = data.totalPrice || 0;
    this.shippingAddress = data.shippingAddress;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      items: this.items,
      status: this.status,
      totalPrice: this.totalPrice,
      shippingAddress: this.shippingAddress,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = { Order, OrderStatus };
