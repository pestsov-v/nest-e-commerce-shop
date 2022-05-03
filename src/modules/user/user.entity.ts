import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './user-role.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ default: true })
  active: boolean;
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
  @Column({ default: Date.now() })
  hashedRefreshToken: string;
}
