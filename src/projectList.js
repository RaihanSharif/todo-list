import Project from "./project.js";

// a list of projects.
class ProjectList {
    projects = [];

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(project) {
        if (this.projects.includes(project)) {
            const index = this.projects.indexOf(project);
            this.projects.splice(index, 1);
        }
    }

    // returns the matching object
    getProject(attribute, value) {
        return this.projects.find(proj => proj[attribute] === value);
    }

    // TODO: add static function to move a task between projects
}

export default ProjectList;