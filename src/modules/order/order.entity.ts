import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { OrderItemEntity } from './order-item.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
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

  @Exclude()
  @Column({ default: false })
  complete: boolean;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];

  @Expose()
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  get total() {
    return this.orderItems.reduce((sum, item) => sum + item.userRevenue, 0);
  }
}
