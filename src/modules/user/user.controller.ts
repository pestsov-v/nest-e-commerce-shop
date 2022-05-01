import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UserService } from './user.service';
import { UsersGetResponse } from './response/users.get.response';
import { UserGetResponse } from './response/user.get.response';
import { ChangeUserRoleDto } from './dto/changeUserRole.dto';
import { ReactivatedResponse } from './response/reactivated.response';
import { User } from './user.entity';
import { DeactivatedResponse } from './response/deactivated.response';
import { USER_ROLE_NOT_EXISTS } from './user.constants';
import { ChangeUserRoleResponse } from "./response/changeUserRole.response";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signup(@Body() dto: CreateUserDto): Promise<UserGetResponse> {
    const user = await this.userService.createUser(dto);

    return {
      status: 'success',
      data: user,
    };
  }

  @Get()
  async getUsers(): Promise<UsersGetResponse> {
    const users = await this.userService.getUsers();

    return {
      status: 'success',
      amount: users.length,
      data: {
        data: users,
      },
    };
  }

  @Get(':id')
  async getUser(@Param() id: string): Promise<UserGetResponse> {
    const user = await this.userService.getUser(id);

    return {
      status: 'success',
      data: user,
    };
  }

  @Patch(':id/deactivated')
  async deactivatedUser(@Param() id: string): Promise<DeactivatedResponse> {
    const user = await this.userService.deactivateUser(id);

    return {
      status: 'success',
      message: 'Пользователь успешно деактивирован',
      data: user,
    };
  }

  @Patch(':id/reactivated')
  async reactivatedUser(id: string): Promise<ReactivatedResponse> {
    const user: User = await this.userService.reactivateUser(id);
    return {
      status: 'success',
      message: 'Пользователь успешно восстановлен',
      data: user,
    };
  }

  @Patch(':id/role')
  async changeUserRole(@Param() id: string, @Body() dto: ChangeUserRoleDto): Promise<ChangeUserRoleResponse> {
    if (!dto.role)
      throw new HttpException(USER_ROLE_NOT_EXISTS, HttpStatus.CONFLICT);

    const updateUser = await this.userService.changeUserRole(id, dto.role);

    return {
      status: 'success',
      message: `Пользователю теперь принадлежит роль: ${updateUser.role}`,
      data: updateUser,
    };
  }
}
