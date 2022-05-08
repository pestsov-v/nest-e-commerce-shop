import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';
import { OrderItemEntity } from './order-item.entity';
import { OrderItemRepository } from './order-item.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      OrderRepository,
      Order,
      OrderItemRepository,
      OrderItemEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
