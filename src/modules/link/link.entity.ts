import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
  Unique
} from 'typeorm';
import { BaseEntity } from '../../core/base/base.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';


@Entity('link')
@Unique(['id'])
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'linkProduct',
    joinColumn: { name: 'linkId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'productId' },
  })
  products: Product[];
}
