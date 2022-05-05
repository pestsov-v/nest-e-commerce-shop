import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/user.entity';
import { AuthHelper } from './auth.helper';
import { AccessTokenStrategy } from './strategy/accessToken.strategy';
import { RefreshTokenStrategy } from './strategy/refreshToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import { SessionService } from '../session/session.service';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule,
    TypeOrmModule.forFeature([UserRepository, User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthHelper,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    SessionService,
  ],
})
export class AuthModule {}
