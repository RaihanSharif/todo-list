import Task from "./task.js";

class Project {
    #taskList= [];

    // TODO: Add a static method to move an item from one project to another
    // TODO: static field to track number of tasks in project
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    get taskList() {
        console.log(this.#taskList);
        return this.#taskList;
    }

    addTask(todoItem) {
        this.#taskList.push(todoItem); //TODO: check for duplicates
    }

    removeTask(todoItem) {
        // the include has to be the exact same object, not another object with same attributes
        if (this.#taskList.includes(todoItem)) {
            const index = this.#taskList.indexOf(todoItem);
            this.#taskList.splice(index, 1);
        }
    }
};

export default Project;
