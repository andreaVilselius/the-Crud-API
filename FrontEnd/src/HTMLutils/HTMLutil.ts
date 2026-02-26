import { Order } from "../Models/Order";
import type { Product } from "../Models/Product";
import {
  addProductToOrder,
  getOrders,
  removeOrder,
  removeProductFromOrder,
  updateOrder,
  updateProductRequest,
} from "../services/orderService";

let productAdded = false;
export const createHTML = (orders: Order[]) => {
  const ul = document.getElementById("orders");
  if (!ul) return;
  ul.innerHTML = "";
  orders.forEach((order) => {
    // const li = document.createElement("li");
    const infoDiv = document.createElement("div");
    infoDiv.className = "infoDiv";

    const orderInfoDiv = document.createElement("div");
    orderInfoDiv.className = "orderInfoDiv";

    const removebtn = document.createElement("button");
    removebtn.innerHTML = "remove";
    const changebtn = document.createElement("button");
    changebtn.innerHTML = "change order info";

    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const span = document.createElement("span");

    h3.innerHTML = "Name: " + order.name;
    p.innerHTML = "Adress: " + order.address;
    span.innerHTML = "Id: " + order.id.toString();

    orderInfoDiv?.appendChild(h3);
    orderInfoDiv?.appendChild(p);
    orderInfoDiv?.appendChild(span);
    infoDiv?.appendChild(orderInfoDiv);
    infoDiv?.appendChild(changebtn);
    infoDiv?.appendChild(removebtn);

    //remove order
    removebtn.addEventListener("click", async () => {
      const success = await removeOrder(order.id);
      if (success) {
        const orders = await getOrders();

        createHTML(orders);
      } else {
        console.log("not able to delete order");
      }
    });

    const formUl = document.createElement("ul");

    // add products
    const productForm = document.createElement("form");
    const fAmountOfProducts = document.createElement("input");
    fAmountOfProducts.type = "text";
    fAmountOfProducts.placeholder = " 5 ";
    const fProductName = document.createElement("input");
    fProductName.type = "text";
    fProductName.placeholder = "dress";
    const fProductPrice = document.createElement("input");
    fProductPrice.type = "text";
    fProductPrice.placeholder = "50";
    const addProductsBtn = document.createElement("button");
    addProductsBtn.type = "submit";
    addProductsBtn.innerHTML = "add products";

    productForm.appendChild(fAmountOfProducts);
    productForm.appendChild(fProductName);
    productForm.appendChild(fProductPrice);
    productForm.appendChild(addProductsBtn);
    formUl.appendChild(productForm);

    order.orderItems.forEach((item) => {
      fAmountOfProducts.value = item.nrOfProducts.toString();
      fProductName.value = item.product.name;
      fProductPrice.value = item.product.price.toString();

      if (productAdded) {
        const productLi = document.createElement("li");
        const removeProductBtn = document.createElement("button");
        removeProductBtn.innerHTML = "remove product";
        const updateProductBtn = document.createElement("button");
        updateProductBtn.innerHTML = "update product";

        productLi.innerHTML =
          "Antal varor  :" +
          item.nrOfProducts.toString() +
          " st " +
          ", Typ av vara:  " +
          item.product.name +
          ", Pris per vara: " +
          item.product.price.toString();
        +" kr ";

        //remove product from order
        removeProductBtn.addEventListener("click", async () => {
          const productRemovedSuccess = await removeProductFromOrder(
            order.id,
            item.product.id,
          );
          if (productRemovedSuccess) {
            const orders = await getOrders();
            createHTML(orders);
          } else {
            console.log("not able to delete product");
          }
        });

        //update product

        const updateProductForm = document.createElement("form");
        const quantityInput = document.createElement("input");
        quantityInput.type = "text";
        const productNameInput = document.createElement("input");
        quantityInput.type = "text";
        const priceInput = document.createElement("input");
        quantityInput.type = "text";

        updateProductBtn.addEventListener("click", async () => {
          //  quantityInput.value = order.id.toString();
          productNameInput.value = item.product.name;
          priceInput.value = item.product.price.toString();

          const saveUpdatedProductBtn = document.createElement("button");
          saveUpdatedProductBtn.type = "submit";
          saveUpdatedProductBtn.innerHTML = "save";

          //updateProductForm.appendChild(quantityInput);
          updateProductForm.appendChild(productNameInput);
          updateProductForm.appendChild(priceInput);
          updateProductForm.appendChild(saveUpdatedProductBtn);
        });

        updateProductForm.addEventListener("submit", async (e) => {
          const theUpdatedProduct = {
            id: item.product.id,
            name: productNameInput.value,
            price: parseInt(priceInput.value),
          };

          e.preventDefault();
          const productUpdateSuccess = await updateProductRequest(
            order.id,
            item.product.id,
            theUpdatedProduct,
          );

          if (productUpdateSuccess) {
            const orders = await getOrders();
            createHTML(orders);
          }
        });

        productLi.appendChild(updateProductBtn);
        productLi.appendChild(removeProductBtn);
        productLi.appendChild(updateProductForm);
        formUl.appendChild(productLi);
        infoDiv.appendChild(formUl);
      }
    });

    //add product to order

    productForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newProduct = {
        product: {
          id: 0,
          name: fProductName.value,
          price: parseInt(fProductPrice.value) || 0,
        },
        nrOfProducts: parseInt(fAmountOfProducts.value) || 0,
      };

      const addProductsSuccess = await addProductToOrder(order.id, newProduct);

      if (addProductsSuccess) {
        const orders = await getOrders();
        productAdded = true;
        createHTML(orders);
      }
    });

    //change order

    const form = document.createElement("form");

    const fName = document.createElement("input");
    const fAdress = document.createElement("input");

    changebtn.addEventListener("click", async () => {
      //skapa två nya fält för namn och epost
      form.innerHTML = "";

      //   const fName = document.createElement("input");
      fName.type = "text";
      fName.value = order.name;

      // const fEmail = document.createElement("input");
      fAdress.type = "text";
      fAdress.value = order.address;

      const subBtn = document.createElement("button");
      subBtn.type = "submit";
      subBtn.textContent = "save";
      //

      /*  const addOrderBtn = document.createElement("button");
      addOrderBtn.innerHTML = "add order";*/

      form.appendChild(fName);
      form.appendChild(fAdress);
      //  form.appendChild(addOrderBtn);
      form.appendChild(subBtn);
      infoDiv.appendChild(form);
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const success = await updateOrder(order.id, {
        ...order,
        name: fName.value,
        address: fAdress.value,
      });
      if (success) {
        const users = await getOrders();
        createHTML(users);
      }
    });
    /*li.appendChild(changebtn);
    li.appendChild(removebtn);*/
    infoDiv.appendChild(productForm);

    /* li.appendChild(fAmountOfProducts);
    li.appendChild(fProductName);
    li.appendChild(fProductPrice);
    li.appendChild(addProductsBtn);*/

    ul.appendChild(infoDiv);
  });
};
