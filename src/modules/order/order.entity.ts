import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Link } from '../link/link.entity';
import { Item } from '../item/item.entity';
import { User } from '../user/user.entity';

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

  @Exclude()
  @Column({ default: false })
  complete: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAd: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Link, (link) => link.orders, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    referencedColumnName: 'code',
    name: 'code',
  })
  link: Link;

  @OneToMany(() => Item, (items) => items.order)
  items: Item[];

  @ManyToOne(() => User, (user) => user.orders, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @Expose()
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  @Expose()
  get total() {
    return this.items.reduce((sum, item) => sum + item.userRevenue, 0);
  }
}
