import { Product } from '../product.entity';

export class productsResponses {
  status: string;
  amount: number;
  data: {
    data: Product[];
  };
}
