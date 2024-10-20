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
        return true; // successful returns true, else returns false
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

    moveTask(taskTitle, otherProject) {
        const task = this.getTask(taskTitle);

        if(!task) {
            console.log('could not find task in this project');
            return false;
        }

        const moved = otherProject.addTask(task);
        if (moved) {
            console.log(`moved task successfully`);
            this.removeTask(task);
            return true;
        } else {
            console.log(`task with same title already exists in other project`);
            return false;
        }
    }
};

export default Project;
