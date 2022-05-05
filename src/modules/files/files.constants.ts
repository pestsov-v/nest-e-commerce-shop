import { format } from 'date-fns';
import { path } from 'app-root-path';

export const projectName = (id) => {
  const year = format(new Date(), 'yyyy');
  return `О-${id}-${year}`;
};

export const FILE_NOT_FOUND = 'Файл с таким именем не найден';
export const FILE_DELETE_SUCCESS = 'Файл был успешно удалён';
