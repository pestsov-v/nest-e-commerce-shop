import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('product')
@Unique(['productId'])
export class Product {
  @PrimaryGeneratedColumn()
  productId: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column({ default: true })
  active: boolean;
}
