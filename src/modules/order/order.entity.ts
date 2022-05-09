import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  orderId: string;

  @Column({ nullable: true })
  transactionId: string;

  @Column()
  userId: string;

  @Column()
  code: string;

  @Column()
  userEmail: string;

  @Exclude()
  @Column()
  firstName: string;

  @Exclude()
  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  zip: string;

  @CreateDateColumn()
  createdAd: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @Column({ default: false })
  complete: boolean;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];

  @Expose()
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  @Expose()
  get total() {
    return this.orderItems.reduce((sum, item) => sum + item.userRevenue, 0);
  }
}
