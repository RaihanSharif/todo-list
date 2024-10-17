import Task from "./task.js";


class Project {
    taskList= [];

    // TODO: Add a static method to move an item from one project to another
    // TODO: static field to track number of tasks in project
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    get taskList() {
        return this.taskList;
    }

    addTask(task) {
        this.taskList.push(task); //TODO: check for duplicates
    }

    removeTask(task) {
        // the include has to be the exact same object, not another object with same attributes
        if (this.taskList.includes(task)) {
            const index = this.taskList.indexOf(task);
            this.taskList.splice(index, 1);
        }
    }

    getTask(titleIn) {
        return this.taskList.find(({title}) => title === titleIn);
    }
};

export default Project;
