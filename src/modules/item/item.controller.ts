import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @HttpCode(201)
  @Post()
  async createItem(@Body() dto) {
    await this.itemService.createItem(dto);
  }

  @HttpCode(200)
  @Get()
  async getItems() {
    return await this.itemService.getItems();
  }

  @HttpCode(200)
  @Get(':itemId')
  async getItem(@Param() id: string) {
    return await this.itemService.getItem(id);
  }

  @HttpCode(200)
  @Patch(':itemId')
  async updateItem(@Param() id: string, @Body() dto) {
    return await this.itemService.updateItem(id, dto);
  }

  @HttpCode(200)
  @Delete(':itemId')
  async deleteItem(@Param() id: string) {
    return await this.itemService.deleteItem(id);
  }
}
