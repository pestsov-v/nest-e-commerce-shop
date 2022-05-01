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

export const UPDATE_USER = 'Пользователь успешно обновлён';
export const DELETED_USER = 'Пользователь успешно удалён';
export const DEACTIVATED_USER = 'Пользователь успешно деактивирован';
export const REACTIVATED_USER = 'Пользователь успешно восстановлен';

export const CHANGE_USER_ROLE = (role) => {
  return `Пользователю теперь принадлежит роль: ${role}`;
};

export const DEACTIVATED_USER_MESSAGE = (amount) => {
  return `Количество деактивированных пользователей: ${amount}`;
};
