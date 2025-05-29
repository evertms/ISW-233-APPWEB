import BaseHTMLElement from "../base/BaseHTMLElement.js";
import { getProductById } from "../../services/Menu.js";

export default class ProductDetails extends BaseHTMLElement {
  constructor() {
    super();
  }

  async load() {
    await this.loadHTML("/blocks/productDetails/productDetails.template");
    const productTitle = this.shadowRoot.querySelector(".product-details__title");
    const productImage = this.shadowRoot.querySelector(".product-details__image");
    const productDescription = this.shadowRoot.querySelector(".product-details__description");
    const productPrice = this.shadowRoot.querySelector(".product-details__price");
    
    const product = await getProductById(this.dataset.productId);
    productTitle.textContent = product.title;
    productImage.src = product.imageUrl;
    productImage.alt = product.altText;
    productDescription.textContent = product.description;
    productPrice.textContent += product.price;
  }

  connectedCallback() {
    this.load();
  }
}

customElements.define("product-details", ProductDetails);