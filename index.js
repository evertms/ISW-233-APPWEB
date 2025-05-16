// TODO: Use the DOM API to create the card components
// 1. Seleccione el container
const container = document.getElementById("container");

// 2. cree una función createCardComponent
/**
 * @param {string} title
 * @param {string} body
 *
 * @return {HTMLElement}
 */
function createCardComponent(title, body) {
    const template = document.getElementById("card__template");
    const element = template.content.cloneNode(true).firstElementChild;
    
    const elementTitle = element.querySelector(".card__title");
    elementTitle.textContent = title;
    
    const elementBody = element.querySelector(".card__body__content");
    elementBody.textContent = body;
    
    return element;
}

// 3. Crear componente de ejemplo
const card1 = createCardComponent("Fundamentals 1", "Some random text here");

// 4. Agregar los componentes al container
container.appendChild(card1);