import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from './medataKeys.decorators.constants';
import { Role } from '../../modules/user/user-role.enum';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
