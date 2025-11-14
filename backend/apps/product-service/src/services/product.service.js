const { ProductRepository } = require('../repositories/product.repository');

class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  create(dto) {
    return this.productRepository.create(dto);
  }

  findAll() {
    return this.productRepository.findAll();
  }

  findById(id) {
    return this.productRepository.findById(id);
  }

  update(id, dto) {
    return this.productRepository.update(id, dto);
  }

  delete(id) {
    return this.productRepository.delete(id);
  }

  decrementStock(id, quantity) {
    return this.productRepository.decrementStock(id, quantity);
  }

  getStock(id) {
    return this.productRepository.getStock(id);
  }
}

module.exports = { ProductService };
