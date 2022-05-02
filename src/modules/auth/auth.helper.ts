import { genSalt, hash } from 'bcryptjs';

export class AuthHelper {
  async hashData(password: string) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }
}
