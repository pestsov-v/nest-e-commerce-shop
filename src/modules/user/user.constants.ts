import { HttpException, HttpStatus } from '@nestjs/common';

export const USERS_LIST_EMPTY = {
  status: 'fail',
  data: {
    message:
      'Список пользователей пуст, необходимо добавить хотя бы одного пользователя в базу данных',
  },
};

export const USER_NOT_FOUND = {
  status: 'fail',
  data: {
    message: 'Пользователя с данным ID не существует',
  },
};

export const USER_ROLE_NOT_EXISTS = {
  status: 'fail',
  data: {
    message: 'Не существует данной роли для пользователя',
  },
};
