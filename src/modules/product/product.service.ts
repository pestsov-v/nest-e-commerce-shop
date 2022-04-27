import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateProductDto } from './dto/create-product.tdo';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: ModelType<ProductModel>,
  ) {}

  async createProduct(dto: CreateProductDto) {
    return await this.productModel.create(dto);
  }

  async getProducts() {
    return this.productModel.find();
  }

  async getProduct(id: string) {
    return this.productModel.findById(id);
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteProduct(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
