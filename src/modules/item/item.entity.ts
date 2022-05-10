import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn()
  itemId: string;

  @Column({ nullable: true })
  productTitle: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  userRevenue: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAd: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'orderId' })
  order: Order;
}
