// the main js file
import "./styles.css";
import Task from "./task.js";
import Project from "./project.js"
import ProjectList from "./projectList.js";
import { renderNewProject, renderProjects, addNewTask } from "./render.js";


//default importing an image example. can be used as src of img html element
// import odingImage from "./oding.png";

const projects = new ProjectList();
const other = new Project("Other", "Tasks that are not assigned to a project");
projects.addProject(other);




const homework = new Project("Homework", "testing bro");
const task1 = new Task('odin project', 'complete faster', 'asdf', 'high');
homework.addTask(task1);
homework.addTask(new Task("C++", "learn about asynchonous execution", "asef", 'high'));
projects.addProject(homework);




const projListContainer = document.getElementById("projects-inner");
renderProjects(projects, projListContainer);

renderNewProject(projects, projListContainer);

addNewTask(projects);


