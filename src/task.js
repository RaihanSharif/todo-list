class TodoTask {
    // isComplete is set to false by default
    constructor(title, description, dueDate, priority, isComplete=false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority; //TODO: should be a numeric range from which users can pick
        this.isComplete = isComplete;
    }

    completeTask() {
        this.isComplete = true;
    }

    undoComplete() {
        this.isComplete = false;
    }
};

export default TodoTask;