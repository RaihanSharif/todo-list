import Task from "./task.js";
import Project from "./project.js";
import { compareAsc, isAfter, isBefore, isWithinInterval } from "date-fns"

// a list of projects.
class ProjectList {
    projects = [];

    // TODO: static field to track number of projects and tasks
    // returns the matching object
    getProject(titleValue) {
        return this.projects.find(({ title }) => title === titleValue);
    }

    get taskCount() {
        return this.projects.map((proj) => proj.taskCount).reduce(
            (a, b) => a + b, 0);
    }

    // returns false if project already in list
    addProject(project) {

        if (!(project instanceof Project)) {
            return false;
        }

        if(this.projects.includes(project)) {
            return false;
        }

        if (this.getProject(project.title)) {
            return false;
        }
        
        this.projects.push(project);
        return true;
    }

    removeProject(project) {
        if (this.projects.includes(project)) {
            const index = this.projects.indexOf(project);
            this.projects.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    getAllTasks() {
        let tasks = [];
        this.projects.forEach(project => {
            tasks.push(project.taskList);
        });
        tasks = tasks.flat();
        return tasks;
    }


    /**
     * 
     * @param {Date} dueAfterDate - the date after which the task is due 
     * @param {Date} dueBeforeDate - the date before which the task is due
     * @returns {Task[]} - An array of Task objects matching the criteria
     */
    filterAllTasksByDueDate(dueBeforeDate, dueAfterDate = new Date(0)) {
        const tasks = this.getAllTasks();
        const filteredTasks = tasks.filter((elem) => {
            return isWithinInterval(new Date(elem['dueDate']), {
                start: dueAfterDate,
                end: dueBeforeDate
            });
        });
        return filteredTasks;
    }


}

export default ProjectList;