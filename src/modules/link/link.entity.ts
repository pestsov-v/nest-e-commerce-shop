import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { Order } from '../order/order.entity';

@Entity('link')
@Unique(['linkId'])
export class Link {
  @PrimaryGeneratedColumn()
  linkId: string;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAd: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'linkProduct',
    joinColumn: { name: 'linkId', referencedColumnName: 'linkId' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'productId' },
  })
  products: Product[];

  @OneToMany(() => Order, (order) => order.link, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    referencedColumnName: 'code',
    name: 'code',
  })
  orders: Order[];
}
