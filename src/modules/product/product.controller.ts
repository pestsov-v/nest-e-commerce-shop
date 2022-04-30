import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.tdo';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { productResponses } from './responses/product.responses';
import { productsResponses } from './responses/products.responses';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() dto: CreateProductDto,
  ): Promise<productResponses> {
    const product = await this.productService.createProduct(dto);

    return {
      status: 'success',
      data: product,
    };
  }

  @Get()
  async getProducts(): Promise<productsResponses> {
    const products = await this.productService.getProducts();

    return {
      status: 'success',
      amount: products.length,
      data: {
        data: products,
      },
    };
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<productResponses> {
    const product = await this.productService.getProduct(id);

    return {
      status: 'success',
      data: product,
    };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    const product = await this.productService.updateProduct(id, dto);

    return {
      status: 'success',
      data: product,
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);

    return {
      status: 'success',
      data: {
        message: 'Продукт был успешно удалён',
        removed_product: product,
      },
    };
  }
}
