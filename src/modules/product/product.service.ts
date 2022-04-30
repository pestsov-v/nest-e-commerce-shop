import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.tdo';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.reposity';
import { Product } from './product.entity';
import { NOT_FOUND_PRODUCT } from './product.constants';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.save(dto);

    console.log(product);

    return product;
  }
  //
  async getProducts(): Promise<Product[]> {
    const products = await this.productRepository.find();

    if (!products) {
      throw new HttpException(NOT_FOUND_PRODUCT, HttpStatus.NOT_FOUND);
    }

    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new HttpException(NOT_FOUND_PRODUCT, HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const product = await this.productRepository.update(id, dto);
    console.log(product);
    if (!product)
      throw new HttpException(NOT_FOUND_PRODUCT, HttpStatus.NOT_FOUND);

    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.delete(id);

    if (!product)
      throw new HttpException(NOT_FOUND_PRODUCT, HttpStatus.NOT_FOUND);

    return product;
  }
}
