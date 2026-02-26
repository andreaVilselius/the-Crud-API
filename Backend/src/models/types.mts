export type Order = {
  id: number;
  name: string;
  adress: string;
};

export type OrderItem = {
  nrOfProducts: number;
  product: Product;
};

export type Product = {
  id: number;
  name: string;
  price: number;
};
