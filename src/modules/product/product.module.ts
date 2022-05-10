import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.reposity';
import { Product } from './product.entity';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({ store: redisStore }),
    ConfigModule,
    TypeOrmModule.forFeature([ProductRepository, Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService, CacheModule],
  exports: [ProductService],
})
export class ProductModule {}
