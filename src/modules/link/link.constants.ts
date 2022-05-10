import { statusEnum } from '../../core/enum/status.enum';
import { HttpStatus } from '@nestjs/common';

export const LINK_NOT_FOUND = 'Ссылка не найдена';
export const LINKS_NOT_FOUND = 'Не существует ни одной ссылки';
export const USER_LINKS_NOT_FOUND = 'Вы пока не создали ни одной ссылки';

export const USER_NOT_AUTH_MESSAGE = 'Пользователь не авторизирован';
export const LINK_NOT_CREATED_MESSAGE =
  'Ссылка не была создана по технической причине. Попробуйте несколько позже...';
export const LINK_CREATED_SUCCESS = 'Ссылка была успешно создана';

export const USER_NOT_AUTH = {
  status: statusEnum.FAIL,
  statusCode: HttpStatus.FORBIDDEN,
  data: {
    message: USER_NOT_AUTH_MESSAGE,
  },
};
export const LINK_NOT_CREATED = {
  status: statusEnum.FAIL,
  statusCode: HttpStatus.FORBIDDEN,
  data: {
    message: LINK_NOT_CREATED_MESSAGE,
  },
};
