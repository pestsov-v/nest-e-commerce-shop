import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from '../link/item.repository';
import { Item } from './item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository, Item])],
  providers: [ItemService],
  controllers: [ItemController],
  exports: [ItemService],
})
export class ItemModule {}
