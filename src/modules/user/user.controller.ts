import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CHANGE_USER_ROLE,
  DEACTIVATED_USER,
  DEACTIVATED_USER_MESSAGE,
  DELETED_USER,
  REACTIVATED_USER,
  UPDATE_USER,
  USER_ROLE_NOT_EXISTS,
} from './user.constants';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UsersGetResponse } from './response/users.get.response';
import { UserGetResponse } from './response/user.get.response';
import { ChangeUserRoleDto } from './dto/changeUserRole.dto';
import { ReactivatedResponse } from './response/reactivated.response';
import { User } from './user.entity';
import { DeactivatedResponse } from './response/deactivated.response';
import { ChangeUserRoleResponse } from './response/changeUserRole.response';
import { getRoleResponse } from './response/getRole.response';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateUserResponse } from './response/updateUser.response';
import { statusEnum } from '../../core/enum/status.enum';
import { DeleteUserResponse } from './response/deleteUser.response';
import { DeactivatedUsersResponse } from './response/deactivatedUsers.response';
import { Roles } from '../../core/decorator/roles.decorator';
import { Role } from './user-role.enum';
import { RolesGuard } from '../../core/guard/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signup(@Body() dto: CreateUserDto): Promise<UserGetResponse> {
    const user: User = await this.userService.createUser(dto);

    return {
      status: statusEnum.SUCCESS,
      data: user,
    };
  }

  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @Get()
  async getUsers(): Promise<UsersGetResponse> {
    const users: User[] = await this.userService.getUsers();

    return {
      status: statusEnum.SUCCESS,
      amount: users.length,
      data: {
        data: users,
      },
    };
  }

  @Get('users')
  async getRoleUsers(): Promise<getRoleResponse> {
    const users: User[] = await this.userService.getRoleUsers();

    return {
      status: statusEnum.SUCCESS,
      amount: users.length,
      data: {
        data: users,
      },
    };
  }

  @Get('managers')
  async getRoleManagers(): Promise<getRoleResponse> {
    const users: User[] = await this.userService.getRoleManagers();

    return {
      status: statusEnum.SUCCESS,
      amount: users.length,
      data: {
        data: users,
      },
    };
  }

  @Get('moderators')
  async getRoleModerators(): Promise<getRoleResponse> {
    const users: User[] = await this.userService.getRoleModerators();

    return {
      status: statusEnum.SUCCESS,
      amount: users.length,
      data: {
        data: users,
      },
    };
  }

  @Get('deactivated-users')
  async getDeactivatedUsers(): Promise<DeactivatedUsersResponse> {
    const users: User[] = await this.userService.getDeactivatedUsers();

    return {
      status: statusEnum.SUCCESS,
      amount: DEACTIVATED_USER_MESSAGE(users.length),
      data: {
        data: users,
      },
    };
  }

  @Get(':id')
  async getUser(@Param() id: string): Promise<UserGetResponse> {
    const user: User = await this.userService.getUser(id);

    return {
      status: statusEnum.SUCCESS,
      data: user,
    };
  }

  @Patch(':id')
  async updateUser(
    @Param() id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    const user: User = await this.userService.updateUser(id, dto);

    return {
      status: statusEnum.SUCCESS,
      message: UPDATE_USER,
      data: user,
    };
  }

  @Patch(':id/deactivated')
  async deactivatedUser(@Param() id: string): Promise<DeactivatedResponse> {
    const user: User = await this.userService.deactivateUser(id);

    return {
      status: statusEnum.SUCCESS,
      message: DEACTIVATED_USER,
      data: user,
    };
  }

  @Patch(':id/reactivated')
  async reactivatedUser(id: string): Promise<ReactivatedResponse> {
    const user: User = await this.userService.reactivateUser(id);

    return {
      status: statusEnum.SUCCESS,
      message: REACTIVATED_USER,
      data: user,
    };
  }

  @Patch(':id/role')
  async changeUserRole(
    @Param() id: string,
    @Body() dto: ChangeUserRoleDto,
  ): Promise<ChangeUserRoleResponse> {
    if (!dto.role)
      throw new HttpException(USER_ROLE_NOT_EXISTS, HttpStatus.CONFLICT);

    const updateUser: User = await this.userService.changeUserRole(
      id,
      dto.role,
    );

    return {
      status: statusEnum.SUCCESS,
      message: CHANGE_USER_ROLE(updateUser.role),
      data: updateUser,
    };
  }

  @Delete()
  async deleteUser(@Param() id: string): Promise<DeleteUserResponse> {
    const user: User = await this.userService.deleteUser(id);

    return {
      status: statusEnum.SUCCESS,
      message: DELETED_USER,
      data: {
        deletedUser: user,
      },
    };
  }
}
