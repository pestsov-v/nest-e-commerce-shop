import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateProductDto } from './dto/create-product.tdo';
import { UpdateProductDto } from './dto/update-product.dto';
import { NOT_FOUND_PRODUCT } from './product.constants';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    const product = await this.productService.createProduct(dto);

    return {
      status: 'success',
      data: {
        data: product,
      },
    };
  }

  @Get()
  async getProducts() {
    const products = await this.productService.getProducts();

    if (!products)
      throw new HttpException(NOT_FOUND_PRODUCT, HttpStatus.NOT_FOUND);

    return {
      status: 'success',
      amount: products.length,
      data: {
        data: products,
      },
    };
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);

    if (!product)
      throw new HttpException(NOT_FOUND_PRODUCT, HttpStatus.NOT_FOUND);

    return {
      status: 'success',
      data: {
        data: product,
      },
    };
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const product = await this.productService.updateProduct(id, dto);

    if (!product)
      throw new HttpException(NOT_FOUND_PRODUCT, HttpStatus.NOT_FOUND);

    return {
      status: 'success',
      data: {
        data: product,
      },
    };
  }

  @Delete(':id')
  async deleteProduct(@Res() res: Response, @Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product)
      throw new HttpException(NOT_FOUND_PRODUCT, HttpStatus.NOT_FOUND);

    return {
      status: 'success',
      data: {
        message: 'Продукт был успешно удалён',
        removed_product: product.name,
      },
    };
  }
}
