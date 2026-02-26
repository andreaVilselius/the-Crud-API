import { model, Schema } from "mongoose";

export const productSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});
export const ProductModel = model("product", productSchema);
