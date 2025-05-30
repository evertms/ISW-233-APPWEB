import Router from "./services/Router.js";

import Store from "./services/store.js";
import { loadData } from "./services/Menu.js";

import MenuPage from "./blocks/menuPage/menuPage.js";
import ProductItem from "./blocks/productItem/productItem.js";
import HomePage from "./blocks/homePage/homePage.js";
import ProductDetails from "./blocks/productDetails/productDetails.js";
import Toast from "./services/toast.js";

globalThis.app = {};

app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", () => {
  loadData();
  app.router.init();
});

window.addEventListener("appcartchange", (event) => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;

  Toast.showMessage("Se ha adicionado al carrito", "success");
});
