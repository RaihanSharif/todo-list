// the main js file
import "./styles.css";
import Task from "./task.js";
import Project from "./project.js"
import ProjectList from "./projectList.js";
import { renderNewProject, renderProjects, renderNewTask, renderProjectTasks } from "./render.js";

// TODO: make sure controller/model does not depend on the view.

//default importing an image example. can be used as src of img html element
// import odingImage from "./oding.png";

const mainProjects = new ProjectList();
const other = new Project("Other", "Tasks that are not assigned to a project");
mainProjects.addProject(other);


const homework = new Project("Homework", "testing bro");
const task1 = new Task('odin project', 'complete faster', '2024-12-10', 'high');
homework.addTask(task1);
homework.addTask(new Task("C++", "learn about asynchonous execution", "2024-12-12", 'high'));
mainProjects.addProject(homework);


const projListContainer = document.getElementById("projects-inner");
renderProjects(mainProjects, projListContainer);

renderNewProject(mainProjects, projListContainer);

renderNewTask(mainProjects);

renderProjectTasks(homework);

const displayAllBtn = document.getElementById('show-all-tasks');

function displayAllTasks(projectList) {
    // combined all the projects into a single project

    const masterProject = new Project('All projects', 'sddsf');

    projectList.projects.forEach(proj => {
        proj.taskList.forEach(elem => {
            masterProject.addTask(elem);
        });
    });

    renderProjectTasks(masterProject);
}

displayAllBtn.addEventListener('click', () => {
    displayAllTasks(mainProjects);
});

export {mainProjects};