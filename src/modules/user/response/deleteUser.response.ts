import { User } from '../user.entity';

export class DeleteUserResponse {
  status: string;
  message: string;
  data: {
    deletedUser: User;
  };
}
