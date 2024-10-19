class Model {
    #projectArray = []; // projects are just strings, must be unique
    #tasksArray = [];

    get projects() {
        return this.#projectArray;
    }

    get tasks() {
        return this.#tasksArray;
    }
    
    findTask(titleIn) {
        return this.#tasksArray.find(({title}) => titleIn);
    }

    addTask(taskIn) {
        if (this.findTask(taskIn.title)) {
            console.log('task aready exsists in this project');
            return 0;
        }
        this.#tasksArray.push(taskIn);
        return 1;
    }

    removeTask(taskIn) {
        if(this.#tasksArray.includes(taskIn)) {
            const index = this.#tasksArray.indexOf(taskIn);
            this.#tasksArray.splice(index, 1);
        }
    }

    findproject(projectName) {
        return this.#projectArray.find(projectName);
    }

    removeProject(projectName) {
        const index = this.#projectArray.indexOf(this.findproject(projectName));
        // if there are tasks related to the project, send an alert, 
        // if confirm, delete project and tasks
        this.#projectArray.splice(index, 1);
    }

    renameProject(projectName, newName) {
        // do some array function to replace old name with new name
    }

    tasksFilteredByProject(projectName) {

    }
}

export default Model;