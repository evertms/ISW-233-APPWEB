import { fetchMovies } from './api/api.js';
import { CommandExecutor } from './services/command.js';
import { Commands } from './services/commands.js';
import { TodoItem } from './services/todoItem.js';
import { TodoList } from './services/todoList.js';

// globalThis -------
globalThis.DOM = {};


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
function createCardComponent(movie) {
    const template = document.getElementById("card__template");
    const element = template.content.cloneNode(true).firstElementChild;
    
    const elementTitle = element.querySelector(".card__title");
    elementTitle.textContent = movie.title;
    
    const elementBody = element.querySelector(".card__body__content");
    elementBody.innerHTML = `
        <p><strong>Descripción:</strong> ${movie.overview}</p>
        <p><strong>Fecha de lanzamiento:</strong> ${movie.release_date}</p>
        <p><strong>Calificación promedio:</strong> ${movie.vote_average}/10</p>
        <p><strong>Número de votos:</strong> ${movie.vote_count}</p>
        <p><strong>Idioma original:</strong> ${movie.original_language.toUpperCase()}</p>
    `;
    
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

/*
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
*/

function renderList() {
    const todoList = getInstance();
    for (const todo of todoList.items()) {
        const li = document.createElement("li");
        li.classList.add("todo__item");
        li.innerHTML = `
            <span class="todo__item-text">${todo.text}</span>
            <div class="todo__item-buttons">
                <button class="todo__button todo__button--done">Done</button>
                <button class="todo__button todo__button--delete">Delete</button>
            </div>
        `;
            DOM.todoList.appendChild(li);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    DOM.todoInput = document.querySelector(".todo__input");
    DOM.addBtn = document.querySelector(".todo__add-button");
    DOM.todoList = document.getElementById("pendingTasks");

    loadMovieCards();  // Cargar las películas

    DOM.addBtn.addEventListener("click", () => {
        const cmd = new Command(Commands.ADD);
        CommandExecutor.execute(cmd);
        //TODO 
    });

    DOM.todoList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            // TODO
        }
    });
    todoList.getInstance().addObserver(renderList);
});