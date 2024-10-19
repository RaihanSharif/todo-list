import Project from "./project.js";

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
}

export default ProjectList;