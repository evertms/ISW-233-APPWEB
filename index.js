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

async function loadMovieCards() {
    const movies = await fetchMovies();
    const movieSection = document.createElement('section');
    movieSection.className = 'movies';
    
    movies.forEach(movie => {
        const card = createCardComponent(movie);
        movieSection.appendChild(card);
    });
    
    container.appendChild(movieSection);
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadMovieCards();
    const input = document.querySelector('.todo__input');
    const addButton = document.querySelector('.todo__add-button');
    const pendingList = document.getElementById('pendingTasks');
    const completedList = document.getElementById('completedTasks');

    function createTodoItem(text, isPending = true) {
        const li = document.createElement('li');
        li.className = 'todo__item';
        
        const span = document.createElement('span');
        span.className = 'todo__item-text';
        span.textContent = text;
        
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'todo__item-buttons';
        
        if (isPending) {
            const doneButton = document.createElement('button');
            doneButton.className = 'todo__button todo__button--done';
            doneButton.textContent = 'Done';
            doneButton.onclick = () => {
                li.remove();
                createTodoItem(text, false);
            };
            buttonsContainer.appendChild(doneButton);
        } else {
            const undoneButton = document.createElement('button');
            undoneButton.className = 'todo__button todo__button--undone';
            undoneButton.textContent = 'Undone';
            undoneButton.onclick = () => {
                li.remove();
                createTodoItem(text);
            };
            buttonsContainer.appendChild(undoneButton);
        }
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'todo__button todo__button--delete';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => li.remove();
        
        buttonsContainer.appendChild(deleteButton);
        li.appendChild(span);
        li.appendChild(buttonsContainer);
        
        if (isPending) {
            pendingList.appendChild(li);
        } else {
            completedList.appendChild(li);
        }
    }

    function addTodo() {
        const text = input.value.trim();
        if (text.length > 1) {
            createTodoItem(text);
            input.value = '';
        }
    }

    addButton.addEventListener('click', addTodo);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});