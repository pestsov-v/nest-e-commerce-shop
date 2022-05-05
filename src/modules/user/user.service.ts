import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { genSalt, hash } from 'bcryptjs';
import { USER_NOT_FOUND, USERS_LIST_EMPTY } from './user.constants';
import { Role } from './user-role.enum';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const salt = await genSalt(10);
    const user = this.userRepository.save({
      email: dto.email,
      first_name: dto.first_name,
      last_name: dto.last_name,
      password: await hash(dto.password, salt),
    });

    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = this.userRepository.find();

    if (!users) throw new HttpException(USERS_LIST_EMPTY, HttpStatus.NOT_FOUND);

    return users;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    return user;
  }

  async getRoleUsers(): Promise<User[]> {
    const roleUsers: User[] = await this.userRepository.find({
      where: { role: Role.USER },
    });

    return roleUsers;
  }

  async getRoleManagers(): Promise<User[]> {
    const roleManagers = await this.userRepository.find({
      where: { role: Role.MANAGER },
    });

    return roleManagers;
  }

  async getRoleModerators(): Promise<User[]> {
    const roleModeratours = await this.userRepository.find({
      where: { role: Role.MODERATOR },
    });

    return roleModeratours;
  }

  async getDeactivatedUsers(): Promise<User[]> {
    const deactivatedUsers: User[] = await this.userRepository.find({
      where: { active: false },
    });

    return deactivatedUsers;
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    const user: User = await this.getUser(id);

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;

    return this.userRepository.save(user);
  }

  async deactivateUser(id: string): Promise<User> {
    const user = await this.getUser(id);

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    user.active = false;

    return await this.userRepository.save(user);
  }

  async reactivateUser(id: string): Promise<User> {
    const user = await this.getUser(id);

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    user.active = true;

    return await this.userRepository.save(user);
  }

  async changeUserRole(id: string, role: Role): Promise<User> {
    const user = await this.getUser(id);

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    user.role = role;

    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.getUser(id);

    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    return await this.userRepository.remove(user);
  }
}
