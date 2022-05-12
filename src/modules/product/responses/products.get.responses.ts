import { Product } from '../product.entity';
import { ApiProperty } from "@nestjs/swagger";

export class productsGetResponses {
  @ApiProperty()
  status: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  data: {
    products: Product[];
  };
} 
