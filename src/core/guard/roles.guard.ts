import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../modules/user/user-role.enum';
import { ROLES_KEY } from '../decorator/medataKeys.decorators.constants';
import { ACCESS_DENIED } from './roles.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (!requiredRoles.includes(request.session.user.role)) {
      throw new HttpException(ACCESS_DENIED, HttpStatus.FORBIDDEN);
    }

    return requiredRoles.some((role: Role) =>
      request.session.user.role.includes(role),
    );
  }
}
