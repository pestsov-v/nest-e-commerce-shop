import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { OrderItemEntity } from './order-item.entity';

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
  @Column()
  firstName: string;
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
  @Column({ default: false })
  complete: boolean;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];
}
