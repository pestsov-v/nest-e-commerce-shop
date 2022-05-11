import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import IORedis from 'ioredis';
import * as passport from "passport";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const RedisStore = connectRedis(session);
const redisClient = new IORedis('redis://localhost:6379');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder().setTitle('S-Prof-Admin-panel').setDescription('Панель администрации интернет-магазина S-Prof с возможностью реализации заказов на сайте').setVersion('1.0').build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api/v1/docs', app, document)


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
