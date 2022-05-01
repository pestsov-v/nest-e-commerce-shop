import { User } from '../user.entity';

export class getRoleResponse {
  status: string;
  amount: number;
  data: {
    data: User[];
  };
}
