import { productDTO } from "./ProductDTO.mjs";

export type OrderItemDTO = {
  nrOfProducts: number | null | undefined;
  product: productDTO;
};
