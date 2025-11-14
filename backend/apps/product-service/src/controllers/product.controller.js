const {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} = require('@nestjs/common');
const { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } = require('@nestjs/swagger');
const { ProductService } = require('../services/product.service');

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  create(dto) {
    return this.productService.create(dto);
  }

  findAll() {
    return this.productService.findAll();
  }

  findById(id) {
    const product = this.productService.findById(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  update(id, dto) {
    const product = this.productService.update(id, dto);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  delete(id) {
    const deleted = this.productService.delete(id);
    if (!deleted) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Product deleted successfully' };
  }

  getStock(id) {
    const stock = this.productService.getStock(id);
    return { id, stock };
  }

  decrementStock(id, body) {
    const success = this.productService.decrementStock(id, body.quantity);
    if (!success) {
      throw new HttpException(
        'Insufficient stock or product not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { message: 'Stock decremented successfully' };
  }
}

// Apply decorators using function calls
ProductController = ApiTags('Products')(ProductController);
ProductController = Controller('products')(ProductController);

// Apply method decorators
ProductController.prototype.create = Post()(ProductController.prototype, 'create', Object.getOwnPropertyDescriptor(ProductController.prototype, 'create')).value;
ProductController.prototype.findAll = Get()(ProductController.prototype, 'findAll', Object.getOwnPropertyDescriptor(ProductController.prototype, 'findAll')).value;
ProductController.prototype.findById = ApiParam({ name: 'id', description: 'Product ID', example: '123e4567-e89b-12d3-a456-426614174000' })(ProductController.prototype, 'findById', Object.getOwnPropertyDescriptor(ProductController.prototype, 'findById'));
ProductController.prototype.findById = Get(':id')(ProductController.prototype, 'findById', Object.getOwnPropertyDescriptor(ProductController.prototype, 'findById')).value;
ProductController.prototype.update = Put(':id')(ProductController.prototype, 'update', Object.getOwnPropertyDescriptor(ProductController.prototype, 'update')).value;
ProductController.prototype.delete = Delete(':id')(ProductController.prototype, 'delete', Object.getOwnPropertyDescriptor(ProductController.prototype, 'delete')).value;
ProductController.prototype.getStock = Get(':id/stock')(ProductController.prototype, 'getStock', Object.getOwnPropertyDescriptor(ProductController.prototype, 'getStock')).value;
ProductController.prototype.decrementStock = Post(':id/decrement-stock')(ProductController.prototype, 'decrementStock', Object.getOwnPropertyDescriptor(ProductController.prototype, 'decrementStock')).value;

module.exports = { ProductController };
