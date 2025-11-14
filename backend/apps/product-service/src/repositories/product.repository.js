const { SimpleProduct } = require('../entities/product.entity');

class ProductRepository {
  constructor() {
    this.products = new Map();
  }

  create(dto) {
    const product = new SimpleProduct(dto);
    this.products.set(product.id, product);
    return product;
  }

  findAll() {
    return Array.from(this.products.values());
  }

  findById(id) {
    return this.products.get(id) || null;
  }

  update(id, dto) {
    const product = this.products.get(id);
    if (!product) return null;

    if (dto.name !== undefined) product.name = dto.name;
    if (dto.description !== undefined) product.description = dto.description;
    if (dto.price !== undefined) product.price = dto.price;
    if (dto.quantity !== undefined) product.quantity = dto.quantity;
    product.updatedAt = new Date();

    this.products.set(id, product);
    return product;
  }

  delete(id) {
    return this.products.delete(id);
  }

  decrementStock(id, quantity) {
    const product = this.products.get(id);
    if (!product || product.quantity < quantity) return false;

    product.quantity -= quantity;
    product.updatedAt = new Date();
    this.products.set(id, product);
    return true;
  }

  getStock(id) {
    const product = this.products.get(id);
    return product ? product.quantity : 0;
  }
}

module.exports = { ProductRepository };
