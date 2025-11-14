const { Order } = require('../entities/order.entity');

class OrderRepository {
  constructor() {
    this.orders = new Map();
  }

  create(order) {
    // Ensure we store an Order instance so an id is always generated and toJSON works
    const newOrder = order instanceof Order ? order : new Order(order);
    this.orders.set(newOrder.id, newOrder);
    return newOrder;
  }

  findAll() {
    return Array.from(this.orders.values());
  }

  findById(id) {
    return this.orders.get(id) || null;
  }

  findByUserId(userId) {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId,
    );
  }

  update(id, dto) {
    const order = this.orders.get(id);
    if (!order) return null;

    if (dto.status !== undefined) order.status = dto.status;
    if (dto.shippingAddress !== undefined) order.shippingAddress = dto.shippingAddress;
    order.updatedAt = new Date();

    this.orders.set(id, order);
    return order;
  }

  delete(id) {
    const exists = this.orders.has(id);
    if (exists) {
      this.orders.delete(id);
    }
    return exists;
  }
}

module.exports = { OrderRepository };
