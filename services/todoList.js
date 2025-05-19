import { observerMixin } from "./mixin";

class TodoItem {
    constructor(text) {
        this.text = text;
    }
}

// Singleton
class TodoList {
    #data = new Set();
    static instance = null;
    static {
        this.instance = new TodoList();
    }

    constructor() {
        if (TodoList.instance) {
            throw new Error("No se puede crear otra instancia de la clase");
        }
    };

    static getInstance() {
        return TodoList.instance;
    };

    add(todoItem) {
        const array = Array.from(this.#data);
        const todoExists = array.filter(t => t.text === todoItem.text).lenght > 1;
        if (!todoExists) {
            this.#data.add(todoItem);
            this.notifyObservers();
        }
    };

    delete(todoItem) {
        this.#data.delete(todoItem);
    };
    
    find(text) {
        const array = Array.from(this.#data);
        return array.find(t => t.text === text);
    };
}

Object.assign(TodoList.prototype, observerMixin); // Inyectar el mixin dentro del prototipo del TodoList