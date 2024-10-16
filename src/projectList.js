import Project from "./project.js";

// a list of projects.
class ProjectList {
    projects = [];
    // returns the matching object
    getProject(attribute, value) {
        return this.projects.find(proj => proj[attribute] === value);
    }

    // returns false if project already in list
    addProject(project) {
        if (!(project instanceof Project)) {
            console.log("not a project");
            return false;
        }

        // TODO: might need to cange this to check for title instead
        if(this.projects.includes(project)) {
            console.log("project already exists");
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
 // TODO: add static function to move a task between projects
}

const proj = new ProjectList();
const pr1 = new Project("Asdf", "WWOWOW");

proj.addProject(pr1);



export default ProjectList;