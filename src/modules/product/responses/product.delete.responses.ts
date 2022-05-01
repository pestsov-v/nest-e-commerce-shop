import { Product } from '../product.entity';

export class ProductDeleteResponses {
  status: string;
  data: {
    message: string;
    removed_product: Product;
  };
}
