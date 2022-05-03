import { Tokens } from '../type/tokens.type';
import { User } from '../../user/user.entity';

export class RefreshTokenResponse {
  status: string;
  message: string;
  data: {
    tokens: Tokens;
    user: User;
  };
}
