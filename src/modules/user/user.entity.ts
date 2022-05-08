import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './user-role.enum';
import { File } from '../files/file.entity';
import { BaseEntity } from "../../core/base/base.entity";

@Entity('user')
export class User extends BaseEntity {
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

  @ManyToOne(() => File, (file: File) => file.userId)
  files: File[];
}
