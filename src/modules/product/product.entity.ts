import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('product')
@Unique(['productId'])
export class Product {
  @PrimaryGeneratedColumn()
  productId: string;

  @Column()
  name: string;
  @Column()
  price: number;

  @CreateDateColumn()
  createdAd: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  active: boolean;
}
