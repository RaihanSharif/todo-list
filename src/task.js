import { format } from "date-fns";

class Task {
    // isComplete is set to false by default
    constructor(title, description, dueDate, priority, project, isComplete=false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority; //TODO: should be a numeric range from which users can pick
        this.project = project;
        this.isComplete = isComplete;
    }

    completeTask() {
        this.isComplete = true;
    }

    undoComplete() {
        this.isComplete = false;
    }

    // TODO: passes in a data object. not all values added yet
    updateTask(data) {
        this.title = data.title;
        this.description = data.description;
        this.dueDate = data.dueDate;
        this.priority = data.priority;
        this.project = data.project;
    }
};

export default Task;