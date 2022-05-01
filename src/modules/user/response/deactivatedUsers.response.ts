import { User } from '../user.entity';

export class DeactivatedUsersResponse {
  status: string;
  amount: string;
  data: {
    data: User[];
  };
}
