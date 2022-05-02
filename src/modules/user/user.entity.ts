import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEnum } from './user-role.enum';

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
  @Column({ default: UserRoleEnum.USER })
  role: UserRoleEnum;
  @Column({ default: Date.now() })
  hashedRefreshToken: string;
}
