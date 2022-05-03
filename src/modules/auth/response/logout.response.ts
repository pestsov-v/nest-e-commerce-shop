import { User } from '../../user/user.entity';

export class LogoutResponse {
  status: string;
  message: string;
  data: {
    user: User;
  };
}
