import { Product } from "../../product/product.entity";

export class UpdateLinkDto {
  code?: string;
  products?: Product[];
};