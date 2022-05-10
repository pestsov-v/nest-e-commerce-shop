import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  CacheKey,
  CacheTTL,
  UseInterceptors,
  CacheInterceptor,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { ProductGetResponses } from './responses/product.get.responses';
import { productsGetResponses } from './responses/products.get.responses';
import { Product } from './product.entity';
import { ProductDeleteResponses } from './responses/product.delete.responses';
import { Cache } from 'cache-manager';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  async createProduct(
    @Body() dto: CreateProductDto,
  ): Promise<ProductGetResponses> {
    const product = await this.productService.createProduct(dto);

    return {
      status: 'success',
      data: product,
    };
  }

  @Get()
  async getProducts(): Promise<productsGetResponses> {
    const products: Product[] = await this.productService.getProducts();

    return {
      status: 'success',
      amount: products.length,
      data: {
        data: products,
      },
    };
  }

  @CacheKey('products_frontend')
  @CacheTTL(1800)
  @UseInterceptors(CacheInterceptor)
  @Get('frontend')
  async frontend() {
    return await this.productService.getProducts();
  }

  @Get('backend')
  async backend() {
    let products = await this.cacheManager.get('products_backend');

    if (!products) {
      products = await this.productService.getProducts();

      await this.cacheManager.set('products_backend', products, { ttl: 1800 });
    }

    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<ProductGetResponses> {
    const product: Product = await this.productService.getProduct(id);

    return {
      status: 'success',
      data: product,
    };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductGetResponses> {
    const product: Product = await this.productService.updateProduct(id, dto);

    await this.cacheManager.del('products_backend')
    await this.cacheManager.del('products_frontend')

    return {
      status: 'success',
      data: product,
    };
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id') id: string,
  ): Promise<ProductDeleteResponses> {
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
