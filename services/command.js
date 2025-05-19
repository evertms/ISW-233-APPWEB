export class Command {
    name;
    args;
    constructor(name, args) {
        this.name = name;
        this.args = args;
    }
}

export const Commands = {
    ADD: 'add',
    DELETE: 'delete'
};

export const CommandExecutor = {
    execute(command) {
        const todoList = TodoList.getInstance();
        switch (command.name) {
            case Commands.ADD:
                const todoInput = globalThis.DOM.todoInput;
                const todoText = todoInput.value.trim();
                const todoExists = todoList.find(todoText);
                if (todoExists == undefined && todoText != "") {
                    todoList.add(new TodoItem(todoText));
                    todoInput.value = "";
                }
                break;

            case Commands.DELETE:
                todoList.delete(command.args);
                break;
        }
    }
}