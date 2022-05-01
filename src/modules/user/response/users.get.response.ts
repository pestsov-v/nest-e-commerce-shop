import { User } from '../user.entity';

export class UsersGetResponse {
  status: string;
  amount: number;
  data: {
    data: User[];
  };
}
