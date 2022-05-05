import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  async createUserSession(session, user) {
    session.user = user;
    session.authenticated = true;

    return session;
  }

  async deleteUserSession(session) {
    return session.destroy();
  }
}
