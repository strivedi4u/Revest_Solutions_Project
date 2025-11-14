const { Module } = require('@nestjs/common');
const { HttpModule } = require('@nestjs/axios');
const { OrderController } = require('./controllers/order.controller');
const { OrderService } = require('./services/order.service');
const { OrderRepository } = require('./repositories/order.repository');

class OrderModule {}

OrderModule = Module({
  imports: [HttpModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService],
})(OrderModule);

module.exports = { OrderModule };
