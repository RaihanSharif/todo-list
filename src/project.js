class Project {
    taskList= [];

    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    get taskList() {
        return this.taskList;
    }

    get taskCount() {
        return this.taskList.length;
    }

    addTask(task) {
        if (this.taskList.includes(task)) {
            console.log('task already exists in this project');
            return false;
        }

        if (this.getTask(task.title)) {
            console.log(`task with this title exists`);
            return false;
        }

        this.taskList.push(task); 
        return true; 
    }

    removeTask(task) {
        // the actual object, not just another object with the same title
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
