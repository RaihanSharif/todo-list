import Task from "./task.js";
import Project from "./project.js";
import { compareAsc, isAfter, isBefore, isWithinInterval } from "date-fns"

// a list of projects.
class ProjectList {
    projects = [];

    // TODO: static field to track number of projects
    // returns the matching object
    getProject(titleValue) {
        return this.projects.find(({ title }) => title === titleValue);
    }

    // returns false if project already in list
    addProject(project) {
        if (!(project instanceof Project)) {
            console.log("not a project");
            return false;
        }

        if(this.projects.includes(project)) {
            console.log("project already exists");
            return false;
        }

        if (this.getProject('title', project.title)) {
            console.log('project already exists');
            return false;
        }
        
        this.projects.push(project);
        return true;
    }

    removeProject(project) {
        if (this.projects.includes(project)) {
            console.log(`project exists, title: ${project.title}`);
            const index = this.projects.indexOf(project);
            this.projects.splice(index, 1);
            console.log(`projects left after removal: ${this.projects}`);
            return true;
        } else {
            console.log("item does not exist");
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
        console.log(`due before: ${dueBeforeDate}, due after ${dueAfterDate}`);
        return filteredTasks;
    }


}

export default ProjectList;