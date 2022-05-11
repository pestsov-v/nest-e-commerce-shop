import { CacheModule, Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkRepository } from './link.repository';
import { Link } from './link.entity';
import { UserModule } from '../user/user.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    UserModule,
    CacheModule.register({ store: redisStore }),
    TypeOrmModule.forFeature([LinkRepository, Link]),
  ],
  providers: [LinkService],
  controllers: [LinkController],
  exports: [LinkService]
})
export class LinkModule {}
