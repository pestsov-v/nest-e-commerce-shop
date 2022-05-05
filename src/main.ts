import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import IORedis from 'ioredis';
import * as passport from "passport";

const RedisStore = connectRedis(session);
const redisClient = new IORedis('redis://localhost:6379');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'redis-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT);
}
bootstrap();
