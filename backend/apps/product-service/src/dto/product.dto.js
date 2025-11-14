const { IsString, IsNumber, Min, MinLength, MaxLength } = require('class-validator');

class CreateProductDto {
  constructor(data = {}) {
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.quantity = data.quantity;
  }
}

class UpdateProductDto {
  constructor(data = {}) {
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.quantity = data.quantity;
  }
}

module.exports = { CreateProductDto, UpdateProductDto };
