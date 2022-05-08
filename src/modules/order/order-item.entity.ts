import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('ordersItem')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  productTitle: string;
  @Column()
  price: number;
  @Column()
  quantity: number;
  @Column()
  userRevenue: number;


  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: 'orderId' })
  order: Order;
}
