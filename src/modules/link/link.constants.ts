import { statusEnum } from '../../core/enum/status.enum';
import { HttpStatus } from '@nestjs/common';

export const USER_NOT_AUTH_MESSAGE = 'Пользователь не авторизирован';
export const LINK_NOT_CREATED_MESSAGE =
  'Ссылка не была создана по технической причине. Попробуйте несколько позже...';
export const LINKS_LIST_EMPTY_MESSAGE = 'Список с ссылками пуст';

export const LINK_CREATED_SUCCESS = 'Ссылка была успешно создана';
export const LINK_NOT_FOUND_MESSAGE = 'Ссылка не найдена';
export const USER_LINKS_NOT_FOUND_MESSAGE =
  'Вы пока не создали ни одной ссылки';
export const GET_USER_LINK_SUCCESS_MESSAGE =
  'Пользователь успешно получил все ссылки';
export const LINK_UPDATED_SUCCESS_MESSAGE = 'Ссылка была успешно обновлена';
export const LINK_DELETED_SUCCESS_MESSAGE = 'Ссылка была успешно удалена';
export const GET_LINK_BY_CODE_SUCCESS_MESSAGE = 'Ссылка была успешно получена';

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

export const LINKS_LIST_EMPTY = {
  status: statusEnum.FAIL,
  statusCode: HttpStatus.NOT_FOUND,
  data: {
    message: LINKS_LIST_EMPTY_MESSAGE,
  },
};

export const LINK_NOT_FOUND = {
  status: statusEnum.FAIL,
  statusCode: HttpStatus.NOT_FOUND,
  data: {
    message: LINK_NOT_FOUND_MESSAGE,
  },
};

export const USER_LINKS_NOT_FOUND = {
  status: statusEnum.FAIL,
  statusCode: HttpStatus.NOT_FOUND,
  data: {
    message: USER_LINKS_NOT_FOUND_MESSAGE,
  },
};
