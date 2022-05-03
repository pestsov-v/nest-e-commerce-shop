import { compare, genSalt, hash } from 'bcryptjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  PASSWORD_NOT_MATCHED,
  REFRESH_TOKEN_NOT_MATCHED,
} from './auth.constants';

export class AuthHelper {
  async hashData(password: string) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async comparePassword(dataPassword, bodyPassword) {
    const passwordMatches = await compare(dataPassword, bodyPassword);

    if (!passwordMatches)
      throw new HttpException(PASSWORD_NOT_MATCHED, HttpStatus.NOT_FOUND);

    return passwordMatches;
  }

  async compareTokens(dataToken, bodyToken) {
    const refreshTokenMatches = compare(dataToken, bodyToken);

    if (!refreshTokenMatches)
      throw new HttpException(REFRESH_TOKEN_NOT_MATCHED, HttpStatus.NOT_FOUND);

    return refreshTokenMatches;
  }
}
