import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { ORDER_NOT_FOUNT } from './order.contants';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: Repository<Order>,
  ) {}

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
