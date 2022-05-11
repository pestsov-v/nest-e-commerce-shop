import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { LinkService } from '../link/link.service';
import { LINK_NOT_FOUND, USER_NOT_AUTH } from '../link/link.constants';
import { UserService } from '../user/user.service';
import { Session as GetSession } from '@nestjs/common/decorators/http/route-params.decorator';
import { UserSession } from '../auth/type/session.type';
import { Product } from "../product/product.entity";
import { ProductService } from "../product/product.service";

@Controller()
export class OrderController {
  constructor(
    private orderService: OrderService,
    private linkService: LinkService,
    private userService: UserService,
    private productService: ProductService
  ) {}

  @HttpCode(201)
  @Post('order')
  async createOrder(@GetSession() session: UserSession, @Body() dto) {
    const link = await this.linkService.getLinkByCode(dto.code);
    if (!link) throw new HttpException(LINK_NOT_FOUND, HttpStatus.NOT_FOUND);

    const userId: string = session.user.userId;
    const user = await this.userService.getUser(userId);
    if (!user) throw new HttpException(USER_NOT_AUTH, HttpStatus.NOT_FOUND);

    const order = this.orderService.createOrder(link, user, dto);

    return order
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
