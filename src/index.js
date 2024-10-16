// the main js file
import "./styles.css";
import Project from "./project.js"
import ProjectList from "./projectList.js";
import { renderProjects } from "./render.js";

//default importing an image example. can be used as src of img html element
// import odingImage from "./oding.png";

const projects = new ProjectList();
const other = new Project("Other", "Tasks that are not assigned to a project");
projects.addProject(other);

const homework = new Project("Homework", "testing bro");
projects.addProject(homework);

const projListContainer = document.getElementById("projects-inner");
renderProjects(projects, projListContainer);



