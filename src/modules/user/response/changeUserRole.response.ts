import { User } from '../user.entity';

export class ChangeUserRoleResponse {
  status: string;
  message: string;
  data: User;
}
