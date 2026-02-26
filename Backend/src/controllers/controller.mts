import { convertDBOrderToDTO, OrderModel } from "../models/order.mjs";
import { orderItemSchema } from "../models/OrderItem.mjs";
import { Order, OrderItem, Product } from "../models/types.mjs";
//CRUD - order

//read
export const getOrders = async () => {
  //hämtar alla ordrar från databasen
  const ordersFromDB = await OrderModel.find();
  return ordersFromDB.map((orderFromDB) => convertDBOrderToDTO(orderFromDB));
};

export const getOrder = async (orderId: string) => {
  // const orderFromDB = await OrderModel.findOne({ id: +orderId });
  const orderFromDB = await OrderModel.findOne({ id: +orderId });
  if (orderFromDB) return convertDBOrderToDTO(orderFromDB);
};

//lite osäker
//lägg till kontroll om inga produkter finns
export const getProductsByOrder = async (orderName: string) => {
  const orderFromDB = await OrderModel.findOne({
    name: orderName,
  }); //hitta order
  //const orderItems = orderFromDB?.orderItems;
  if (orderFromDB) return convertDBOrderToDTO(orderFromDB).orderItems;
};

//lägg till kontroll om inga produkter finns
export const getProductByOrder = async (orderId: string, productId: string) => {
  //hittar en produkt i en order
  const orderFromDB = await OrderModel.findOne({ id: +orderId });
  if (!orderFromDB) return;
  /*const foundProduct = orderFromDB?.orderItems.find(
    (item) => item.product?.id == +productId,
  );*/

  // return foundProduct?.product || null;
  return convertDBOrderToDTO(orderFromDB).orderItems.find(
    (item) => item.product?.id == +productId,
  );
};

//CREATE
/** create order */

export const createOrder = async (name: string, address: string) => {
  const theNewOrder = {
    id: Date.now(),
    name,
    address,
    dateOfOrder: new Date(),
    orderItems: [],
  };
  //return await OrderModel.create(theNewOrder);
  const createdOrder = await OrderModel.create(theNewOrder);
  return convertDBOrderToDTO(createdOrder);
};

/*export const addProduct = async (orderId: string, item: OrderItem) => {
  const foundOrder = await OrderModel.findOne({ id: +orderId });
  if (!foundOrder) return false;
  const theNewProduct = {
    nrOfProducts: item.nrOfProducts,
    product: {
      id: Date.now(),
      name: item.product.name,
      price: item.product.price,
    },
  };
  //convertDBOrderToDTO(foundOrder).orderItems.push(theNewProduct);
  foundOrder.orderItems.push(theNewProduct);
  convertDBOrderToDTO(foundOrder);
  await foundOrder.save();
  return true;
};*/

export const addProduct = async (orderId: string, item: OrderItem) => {
  const foundOrder = await OrderModel.findOne({ id: +orderId });
  if (!foundOrder) return false;

  const newOrderItem = {
    nrOfProducts: item.nrOfProducts,
    product: {
      id: Date.now(),
      name: item.product.name,
      price: item.product.price,
    },
  };

  foundOrder.orderItems.push(newOrderItem);
  const newOrderIndex = foundOrder.orderItems.length - 1;

  await foundOrder.save();

  return convertDBOrderToDTO(foundOrder).orderItems[newOrderIndex]; //returnerar till FE den nya produkten i ordern
};

//PUT - update

export const updateOrder = async (order: Order) => {
  const orderFromDB = await OrderModel.findOneAndUpdate(
    { id: order.id },
    order,
  );
  if (!orderFromDB) return false;

  await orderFromDB.save();
  return convertDBOrderToDTO(orderFromDB);
};

export const updateProduct = async (orderId: string, product: Product) => {
  const foundOrder = await OrderModel.findOne({ id: +orderId });
  if (!foundOrder) return false;

  const foundProduct = foundOrder.orderItems.find(
    (item) => item.product?.id === product.id, //hittar id i body
  );
  if (!foundProduct || !foundProduct.product) return false;

  foundProduct.product.name = product.name;
  foundProduct.product.price = product.price;

  await foundOrder.save();

  //return foundProduct.product;
  const index = foundOrder.orderItems.findIndex(
    (item) => item.product?.id === product.id,
  );

  return convertDBOrderToDTO(foundOrder).orderItems[index];
};

//update nr of products

//remove order
export const removeOrder = async (orderId: string) => {
  const removeOrder = await OrderModel.findOneAndDelete({ id: +orderId });
  if (removeOrder) {
    return true;
  }
  return false;
};

//remove one product
export const removeOneProductFromOrder = async (
  orderId: string,
  productId: string,
) => {
  const foundOrder = await OrderModel.findOne({ id: +orderId });
  if (!foundOrder) return false;
  const index = foundOrder.orderItems.findIndex(
    (item) => item.product?.id === +productId,
  );
  if (index >= 0) {
    foundOrder.orderItems.splice(index, 1);
  }
  foundOrder.save();
  return true;
};
//remove all items from order
export const removeProducts = async (orderId: string) => {
  const foundOrder = await OrderModel.findOne({ id: +orderId });
  if (!foundOrder) return false;

  foundOrder.orderItems.splice(0, foundOrder.orderItems.length);

  await foundOrder.save();
  return true;
};
