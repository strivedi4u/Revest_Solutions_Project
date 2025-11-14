const axios = require('axios');
const { OrderRepository } = require('../repositories/order.repository');
const { OrderStatus } = require('../entities/order.entity');

class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
    this.productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';
  }

  async create(dto) {
    let totalPrice = 0;

    for (const item of dto.items) {
      try {
        const productResponse = await axios.get(
          `${this.productServiceUrl}/api/products/${item.productId}`,
        );
        const product = productResponse.data;

        if (product.quantity < item.quantity) {
          throw new Error(`Insufficient stock for product ${item.productId}`);
        }

        totalPrice += product.price * item.quantity;

        await axios.post(
          `${this.productServiceUrl}/api/products/${item.productId}/decrement-stock`,
          { quantity: item.quantity },
        );
      } catch (error) {
        throw new Error(error.message || `Failed to process product ${item.productId}`);
      }
    }

    const order = this.orderRepository.create({
      userId: dto.userId,
      items: dto.items,
      totalPrice,
      shippingAddress: dto.shippingAddress,
      status: OrderStatus.PENDING,
    });

    return order;
  }

  findAll() {
    return this.orderRepository.findAll();
  }

  findById(id) {
    return this.orderRepository.findById(id);
  }

  findByUserId(userId) {
    return this.orderRepository.findByUserId(userId);
  }

  update(id, dto) {
    return this.orderRepository.update(id, dto);
  }

  delete(id) {
    return this.orderRepository.delete(id);
  }
}

module.exports = { OrderService };
