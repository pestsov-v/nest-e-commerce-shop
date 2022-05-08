import { Controller, Get } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('orders')
  async getOrders() {
    return this.orderService.
  }

}
