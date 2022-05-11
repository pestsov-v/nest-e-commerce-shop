import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { ORDER_NOT_FOUND, ORDERS_NOT_FOUND } from './order.contants';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(link, user, dto) {
    const order = this.orderRepository.save({
      userId: link.user.userId,
      code: link.code,
      userEmail: user.email,
      address: dto.address,
      country: dto.country,
      city: dto.city,
      zip: dto.zip,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: user.email,
    });

    console.log(order)
    return order;
  }

  async getOrders() {
    const orders = await this.orderRepository.find({
      relations: ['orderItems'],
    });

    if (!orders) {
      throw new HttpException(ORDERS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return orders;
  }

  async getOrder(id: string) {
    const order = await this.orderRepository.findOne(id);

    if (!order) throw new HttpException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND);

    return order;
  }

  async updateOrder(id: string, dto) {
    const order = await this.getOrder(id);

    if (!order) throw new HttpException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND);

    order.items = dto.items;
    order.lastName = dto.lastName;
    order.firstName = dto.firstName;
    order.zip = dto.zip;
    order.address = dto.address;
    order.city = dto.city;
    order.complete = dto.complete;
    order.country = dto.country;
    order.email = dto.email;

    return await this.orderRepository.save(order);
  }

  async deleteOrder(id) {
    const order = await this.getOrder(id);

    if (!order) throw new HttpException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND);

    return await this.orderRepository.remove(order);
  }
}
