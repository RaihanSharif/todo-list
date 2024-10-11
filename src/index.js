// the main js file
import "./styles.css";
import TodoTask from "./task.js";
import Project from "./project.js"

//default importing an image example. can be used as src of img html element
// import odingImage from "./oding.png";

const firstTask = new TodoTask("example task", "this is just a test", "12/12/2024", 3);
const defaultProject = new Project("test project", "just testing things out");
defaultProject.addTask(firstTask);

console.log(defaultProject);