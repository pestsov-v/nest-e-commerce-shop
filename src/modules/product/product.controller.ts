import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.tdo';

@Controller('product')
export class ProductController {
  @Post()
  async create(@Body() dto: CreateProductDto) {
    console.log(dto);
  }
}
