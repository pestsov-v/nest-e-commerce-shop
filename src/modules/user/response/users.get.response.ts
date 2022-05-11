import { User } from '../user.entity';

export class UsersGetResponse {
  status: string;
  amount: string;
  data: {
    data: User[];
  };
}
