import { Body, Controller, Get, Post } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('order')
  async createOrder(@Body() dto) {
    return this.orderService.createOrder(dto)
  }

  @Get('order')
  async getOrders() {
    return await this.orderService.getOrders()
  }

}
