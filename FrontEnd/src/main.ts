import { createHTML } from "./HTMLutils/HTMLutil";
import type { Order } from "./Models/Order";
import { createOrder, getOrderById, getOrders } from "./services/orderService";
import "./style.css";
//lägg till order
document
  .getElementById("addOrderForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = (document.getElementById("name") as HTMLInputElement)
      .value;
    const addressInput = (
      document.getElementById("address") as HTMLInputElement
    ).value;

    const order = await createOrder(nameInput, addressInput);
    console.log(order);
    const orders = await getOrders();
    createHTML(orders);
  });
//sök order
document
  .getElementById("searchOrder")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const IdInput = parseInt(
      (document.getElementById("id") as HTMLInputElement).value,
    );
    const idSearch = await getOrderById(IdInput);

    if (idSearch.length == 0) {
      console.log("no such id");
      return;
    }
    createHTML(idSearch);
  });

//hämta alla orders
document.getElementById("readOrders")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const orders = await getOrders();
  createHTML(orders);
});

const orders = await getOrders();
createHTML(orders);

//sökfält - för att söka på ordrar
//knapp - visa alla ordrar

//ett sökfält
// en lista med ordrar
//från den listan - en lista med orderItems [ ]

//read:
//knapp - hämta alla ordrar
//hämta ordrar baserat på id
//hämta en product i en order
//hämta alla produkter i en order

//create:
//skapa en order  - sökfält
//lägga till produkter i order
//uppdatera order
//uppdatera produkt i order

//delete:
//man ska kunna klicka på en order och ta bort den
//man ska kunna ta bort en produkt
//man ska kunna ta bort alla produkter

//Att göra:
/**
 * sorteting
 * reda ut varför det products dupliceras
 * göra så att button products inte dupliceras
 * sortering
 * snygga till kod
 */
