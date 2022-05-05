import { Session } from 'express-session';

export type UserSession = Session & Record<'user', any>;