import Project from "./project.js";

// a list of projects.
class ProjectList {
    #projects = [];

    addProject(project) {
        this.#projects.push(project);
    }

    removeProject(project) {
        if (this.#projects.includes(project)) {
            const index = this.#projects.indexOf(project);
            this.#projects.splice(index, 1);
        }
    }

    // TODO: compine projects?
    // TODO: add static function to move a task between projects
}