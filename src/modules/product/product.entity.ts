import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from "../../core/base/base.entity";

@Entity('product')
@Unique(['productId'])
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  productId: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column({ default: true })
  active: boolean;
}
