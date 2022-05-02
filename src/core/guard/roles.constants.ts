import { UserRoleEnum } from '../../modules/user/user-role.enum';

export const ACCESS_DENIED =
  'Вы не владеете достаточными правами доступа для совершения подобных действий';

export const allAccess = [
  UserRoleEnum.USER,
  UserRoleEnum.MANAGER,
  UserRoleEnum.MODERATOR,
  UserRoleEnum.ADMIN,
]
