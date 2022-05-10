import { Item } from "../../item/item.entity";

export class CreateOrderDto {
  id: string;
  transactionId: string;
  userId: string;
  code: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  country: string;
  city: string;
  zip: string;
  complete: boolean;
  orderItems: Item
}



//
// @ManyToOne(() => Order, (order) => order.orderItems)
// @JoinColumn({ name: 'orderId' })
// order: Order;
//
//   orderItems: OrderItemEntity[];

  // get name() {
  //   return `${this.firstName} ${this.lastName}`;
  // }
  //
  // get total() {
  //   return this.orderItems.reduce((sum, item) => sum + item.userRevenue, 0);
  // }
