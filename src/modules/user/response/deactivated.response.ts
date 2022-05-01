import { User } from '../user.entity';

export class DeactivatedResponse {
  status: string;
  message: string;
  data: User;
}
