import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';
import { LinkModule } from '../link/link.module';
import { UserModule } from '../user/user.module';
import { ProductModule } from "../product/product.module";

@Module({
  imports: [
    ProductModule,
    UserModule,
    LinkModule,
    ConfigModule,
    TypeOrmModule.forFeature([OrderRepository, Order]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
