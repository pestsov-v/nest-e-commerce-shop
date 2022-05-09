import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @HttpCode(201)
  @Post('order')
  async createOrder(@Body() dto) {
    return this.orderService.createOrder(dto);
  }

  @HttpCode(200)
  @Get('order')
  async getOrders() {
    return await this.orderService.getOrders();
  }

  @HttpCode(200)
  @Get('order/:id')
  async getOrder(@Param() id: string) {
    return await this.orderService.getOrder(id);
  }

  @HttpCode(200)
  @Patch('order/:id')
  async updateOrder(@Param() id: string, @Body() dto) {
    return await this.orderService.updateOrder(id, dto);
  }

  @HttpCode(200)
  @Delete('order/:id')
  async deleteOrder(@Param() id: string) {
    return await this.orderService.deleteOrder(id);
  }
}
