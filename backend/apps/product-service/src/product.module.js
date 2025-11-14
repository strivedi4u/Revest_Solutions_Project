const { Module } = require('@nestjs/common');
const { ProductController } = require('./controllers/product.controller');
const { ProductService } = require('./services/product.service');
const { ProductRepository } = require('./repositories/product.repository');

class ProductModule {}

ProductModule = Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})(ProductModule);

module.exports = { ProductModule };
