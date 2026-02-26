import type { Order } from "./Models/Order";
import type { OrderItem } from "./Models/OrderItem";
import type { Product } from "./Models/Product";
import {
  addProductToOrder,
  createOrder,
  getOrderById,
  getOrders,
  getProductByOrder,
  getProductsByOrder,
  removeAllProductsFromOrder,
  removeOrder,
  removeProductFromOrder,
  updateOrder,
  updateProductRequest,
} from "./services/orderService";

/*console.log(getOrders());
console.log(getOrderById(1771853678262));*/

//console.log(getProductsFromOrder("henrik"));
/*
const orderItem1: OrderItem = {
  nrOfProducts: 5,
  product: {
    name: "salva",
    price: 56,
  },
};*/

const order: Order = {
  id: 1772009002873,
  name: "Lotta",
  address: "väg 30",
  orderItem: [],
};

const product: Product = {
  id: 1772016483240,
  name: "klänning",
  price: 75,
};

/*console.log(getProductByOrder(1771853678262, 1772016483240));
console.log(createOrder("andrea", "väg 50"));*/
//console.log(addProductToOrder(1771853678262, orderItem1));
//console.log(updateOrder(1772009002873, order));
//console.log(updateProductRequest(1771853678262, 1772016483240, product));
//console.log(removeOrder(1772018573801));
//console.log(removeProductFromOrder(1772017487796, 1772019889183));
console.log(removeAllProductsFromOrder(1772017487796));
