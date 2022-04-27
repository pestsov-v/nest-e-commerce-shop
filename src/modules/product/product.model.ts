import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps {
  @prop()
  name: string;
  @prop()
  price: number;
}
