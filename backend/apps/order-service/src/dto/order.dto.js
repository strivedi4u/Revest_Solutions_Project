class OrderItemDto {
  constructor(data = {}) {
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.price = data.price;
  }
}

class CreateOrderDto {
  constructor(data = {}) {
    this.userId = data.userId;
    this.items = data.items || [];
    this.shippingAddress = data.shippingAddress;
  }
}

class UpdateOrderDto {
  constructor(data = {}) {
    this.status = data.status;
    this.shippingAddress = data.shippingAddress;
  }
}

module.exports = { OrderItemDto, CreateOrderDto, UpdateOrderDto };
