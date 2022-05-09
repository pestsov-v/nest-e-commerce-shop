import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { ORDER_NOT_FOUNT } from './order.contants';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(dto) {
    const order = this.orderRepository.save(dto);
    return order;
  }

  async getOrders() {
    const orders = await this.orderRepository.find({
      relations: ['orderItems'],
    });

    if (!orders) {
      throw new HttpException(ORDER_NOT_FOUNT, HttpStatus.NOT_FOUND);
    }

    return orders;
  }
}
