import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Column, Repository } from 'typeorm';

import { ITEM_NOT_FOUND, ITEMS_NOT_FOUND } from './item.constants';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  async createItem(dto) {
    const item = this.itemRepository.save(dto);
    return item;
  }

  async getItems() {
    const items = await this.itemRepository.find();

    if (!items) {
      throw new HttpException(ITEMS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return items;
  }

  async getItem(id: string) {
    const item = await this.itemRepository.findOne(id);

    if (!item) throw new HttpException(ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);

    return item;
  }

  async updateItem(id: string, dto) {
    const item = await this.getItem(id);

    if (!item) throw new HttpException(ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);

    item.productTitle = dto.productTitle;
    item.price = dto.price;
    item.quantity = dto.quantity;
    item.userRevenue = dto.userRevenue;

    return await this.itemRepository.save(item);
  }

  async deleteItem(id) {
    const item = await this.getItem(id);

    if (!item) throw new HttpException(ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);

    return await this.itemRepository.remove(item);
  }
}
