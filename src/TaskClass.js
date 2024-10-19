import { format } from "date-fns"; // use this when creating new tasks, not here
class Task {
    constructor(title, description, creationDate, dueDate, priority, project="Unassigned", isComplete=false) {
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.dueDate = dueDate;
        this.project = project;
        this.priority = priority;
        this.isComplete = isComplete;
    }
}

export default Task;