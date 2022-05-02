import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from './medataKeys.decorators.constants';
import { UserRoleEnum } from '../../modules/user/user-role.enum';

export const Roles = (...roles: UserRoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
