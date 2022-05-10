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
import { Role } from './user-role.enum';
import { File } from '../files/file.entity';
import { Order } from '../order/order.entity';
import { Link } from '../link/link.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'default.jpg' })
  image: string;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ default: Date.now() })
  hashedRefreshToken: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAd: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => File, (file: File) => file.userId)
  files: File[];

  @OneToMany(() => Order, (order) => order.user, {
    createForeignKeyConstraints: false,
  })
  orders: Order[];

  @OneToMany(() => Link, (link) => link.linkId, {
    createForeignKeyConstraints: false,
  })
  link: Link;
}
