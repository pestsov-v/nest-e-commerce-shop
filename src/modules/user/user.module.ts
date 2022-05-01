import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserRepository, User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
