import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { genSalt, hash } from 'bcryptjs';
import { USER_NOT_FOUND, USERS_LIST_EMPTY } from './user.constants';
import { UserGetResponse } from './response/user.get.response';
import { UserRoleEnum } from './user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const salt = await genSalt(10);
    const user = this.userRepository.save({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: await hash(dto.password, salt),
    });

    return user;
  }

  async getUsers() {
    const users = this.userRepository.find();

    if (!users) throw new HttpException(USERS_LIST_EMPTY, HttpStatus.NOT_FOUND);

    return users;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    return user;
  }

  async deactivateUser(id: string) {
    const user = await this.getUser(id);

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    user.active = false;

    return await this.userRepository.save(user);
  }

  async reactivateUser(id: string) {
    const user = await this.getUser(id);

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    user.active = true;

    return await this.userRepository.save(user);
  }

  async changeUserRole(id: string, role: UserRoleEnum): Promise<User> {
    const user = await this.getUser(id);

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    user.role = role;

    return await this.userRepository.save(user);
  }
}
