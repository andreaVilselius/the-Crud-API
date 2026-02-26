import type { OrderItems } from "./OrderItem";
/*
export type Order = {
  id: number;
  name: string;
  address: string;
  orderItem: OrderItem[];
};
*/
export class Order {
  id: number;
  name: string;
  address: string;
  orderItems: OrderItems[];

  constructor(
    id: number,
    name: string,
    address: string,
    orderItems: OrderItems[],
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.orderItems = orderItems;
  }
}
