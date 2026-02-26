import { model, Schema } from "mongoose";
import { productSchema } from "./product.mjs";

export const orderItemSchema = new Schema({
  nrOfProducts: { type: Number },
  product: productSchema,
});

export const OrderItemModel = model("orderItem", orderItemSchema);
