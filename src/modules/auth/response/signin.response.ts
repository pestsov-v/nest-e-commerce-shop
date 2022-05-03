import { User } from '../../user/user.entity';
import { Tokens } from '../type/tokens.type';

export class SigninResponse {
  status: string;
  message: string;
  data: {
    tokens: Tokens;
    user: User;
  };
}
