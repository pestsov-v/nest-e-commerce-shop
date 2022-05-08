import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { User } from '../user/user.entity';
import { BaseEntity } from "../../core/base/base.entity";

@Entity('files')
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  fileId: string;

  @Column()
  @IsString()
  originalName: string;

  @Column()
  @IsString()
  currentName: string;

  @Column()
  @IsString()
  extension: string;

  @Column('int')
  @IsNumber()
  size: number;

  @ManyToOne(() => User, (user: User) => user.image)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;
}
