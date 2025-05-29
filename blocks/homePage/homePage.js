export class HomePage extends HTMLElement {
	constructor() {
		super();
		this.root = this.attachShadow({ mode: "open" });

		const styles = document.createElement("style");
		this.root.appendChild(styles);

		async function loadCSS() {
      const request = await fetch("/blocks/HomePage/HomePage.css");
      const css = await request.text();
      styles.textContent = css;
		}
		loadCSS();
	}

  connectedCallback() {
    const template = document.getElementById("home-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);
    
    this.render();
  }

  render() {
    const bestSelling = [
      {
          id: 1,
          imageUrl: "https://placehold.co/600x400/FF6347/FFFFFF?text=Italian+Margherita ",
          altText: "Pizza Margherita",
          title: "Italian Pizza Margherita",
          description: "Classic Neapolitan pizza made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.",
          price: "$14.99"
      },
      {
          id: 2,
          imageUrl: "https://placehold.co/600x400/4682B4/FFFFFF?text=USA+Cheeseburger ",
          altText: "Classic American Cheeseburger",
          title: "USA Classic Cheeseburger",
          description: "A juicy beef patty with melted cheddar cheese, lettuce, tomato, onions, and pickles, served in a toasted bun.",
          price: "$12.50"
      },
      {
          id: 3,
          imageUrl: "https://placehold.co/600x400/FFC107/333333?text=Spanish+Paella ",
          altText: "Spanish Seafood Paella",
          title: "Spanish Seafood Paella",
          description: "A traditional Spanish rice dish made with saffron-infused rice, seafood like shrimp and mussels, chicken, and vegetables.",
          price: "$22.00"
      },
      {
          id: 4,
          imageUrl: "https://placehold.co/600x400/8B4513/FFFFFF?text=French+Coq+au+Vin ",
          altText: "French Coq au Vin",
          title: "French Coq au Vin",
          description: "A classic French dish of chicken braised with wine (traditionally Burgundy), lardons, mushrooms, and optionally garlic.",
          price: "$24.75"
      },
      {
          id: 5,
          imageUrl: "https://placehold.co/600x400/008000/FFFFFF?text=Mexican+Tacos ",
          altText: "Mexican Street Tacos",
          title: "Mexican Street Tacos al Pastor",
          description: "Flavorful spit-grilled pork, marinated in a blend of dried chilies, spices, and pineapple, served on small corn tortillas.",
          price: "$10.99"
      }
    ];

    if (bestSelling && bestSelling.length > 0) {
      this.root.querySelector("#best-selling").innerHTML = "";
      for (let product of bestSelling) {
        const item = document.createElement("product-item");
        item.dataset.product = JSON.stringify(product);
        this.root.querySelector("#best-selling").appendChild(item);
      }
    } else {
      this.root.querySelector("#best-selling").innerHTML = "Loading...";
    }
  }
}

customElements.define("home-page", HomePage);