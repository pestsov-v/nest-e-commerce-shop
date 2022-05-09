import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { User } from '../user/user.entity';

@Entity('file')
@Unique(['fileId'])
export class File {
  @PrimaryGeneratedColumn()
  fileId: string;

  @Column()
  userId: number;

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

  @CreateDateColumn()
  createdAd: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user: User) => user.image)
  @JoinColumn({ name: 'userId' })
  user: User;


}
