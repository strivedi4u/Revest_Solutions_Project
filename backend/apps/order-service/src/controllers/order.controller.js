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
const { OrderService } = require('../services/order.service');

@ApiTags('Orders')
@Controller('orders')
class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({
    description: 'Order data with items and shipping address',
    example: {
      userId: 'user123',
      items: [{ productId: 'prod456', quantity: 2 }],
      shippingAddress: '123 Main St, City, State 12345'
    }
  })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid product or insufficient stock' })
  @Post()
  async create(@Body() dto) {
    return await this.orderService.create(dto);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of all orders' })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Order found' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @Get(':id')
  findById(@Param('id') id) {
    const order = this.orderService.findById(id);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  @ApiOperation({ summary: 'Get orders by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID', example: 'user123' })
  @ApiResponse({ status: 200, description: 'List of user orders' })
  @Get('user/:userId')
  findByUserId(@Param('userId') userId) {
    return this.orderService.findByUserId(userId);
  }

  @ApiOperation({ summary: 'Update order' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiBody({ description: 'Updated order data (status, shipping address)' })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @Put(':id')
  update(@Param('id') id, @Body() dto) {
    const order = this.orderService.update(id, dto);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  @ApiOperation({ summary: 'Delete order' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @Delete(':id')
  delete(@Param('id') id) {
    const deleted = this.orderService.delete(id);
    if (!deleted) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Order deleted successfully' };
  }
}

module.exports = { OrderController };
