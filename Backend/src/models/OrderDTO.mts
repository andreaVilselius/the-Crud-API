import { OrderItemDTO } from "./OrderItemDTO.mjs";

export type OrderDTO = {
  id: number;
  name: string;
  address: string;
  dateOfOrder: Date;
  orderItems: OrderItemDTO[];
};
