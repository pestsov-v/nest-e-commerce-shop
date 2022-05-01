import { Product } from '../product.entity';

export class productsGetResponses {
  status: string;
  amount: number;
  data: {
    data: Product[];
  };
}
