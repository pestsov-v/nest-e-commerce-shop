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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { statusEnum } from '../../core/enum/status.enum';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly productService: ProductService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createProduct(
    @Body() dto: CreateProductDto,
  ): Promise<ProductGetResponses> {
    const product = await this.productService.createProduct(dto);
    this.eventEmitter.emit('productUpdated');

    return {
      status: statusEnum.SUCCESS,
      data: product,
    };
  }

  @CacheKey('getProducts')
  @CacheTTL(1800)
  @UseInterceptors(CacheInterceptor)
  @Get()
  async getProducts(): Promise<productsGetResponses> {
    let products: Product[] = await this.cacheManager.get('getProducts');
    if (!products) {
      products = await this.productService.getProducts();
      await this.cacheManager.set('getProducts', products, { ttl: 1800 });
    }

    return {
      status: statusEnum.SUCCESS,
      amount: products.length,
      data: {
        data: products,
      },
    };
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<ProductGetResponses> {
    const product: Product = await this.productService.getProduct(id);

    return {
      status: statusEnum.SUCCESS,
      data: product,
    };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductGetResponses> {
    const product: Product = await this.productService.updateProduct(id, dto);
    this.eventEmitter.emit('productUpdated');

    return {
      status: statusEnum.SUCCESS,
      data: product,
    };
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id') id: string,
  ): Promise<ProductDeleteResponses> {
    const product = await this.productService.deleteProduct(id);
    this.eventEmitter.emit('productUpdated');

    return {
      status: statusEnum.SUCCESS,
      data: {
        message: 'Продукт был успешно удалён',
        removed_product: product,
      },
    };
  }
}
