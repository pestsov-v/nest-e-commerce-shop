import { User } from '../user.entity';

export class UpdateUserResponse {
  status: string;
  message: string;
  data: User;
}
