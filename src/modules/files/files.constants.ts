import { format } from 'date-fns';
import { path } from "app-root-path";


export const projectName = (id) => {
  const year = format(new Date(), 'yyyy');
  return `О-${id}-${year}`;
};