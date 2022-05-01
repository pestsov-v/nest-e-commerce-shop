import { User } from '../user.entity';

export class ReactivatedResponse {
  status: string;
  message: string;
  data: User;
}
