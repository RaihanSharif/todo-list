// the main js file
import "./styles.css";
import Task from "./task.js";
import Project from "./project.js"
import ProjectList from "./projectList.js";
import {renderProjects, renderTasks } from "./render.js";
import { buildTaskCardList, buildProjectCardList } from "./DOMBuilders.js";
import { initListeners } from "./eventHandlers.js";
import { initForms } from "./forms.js"

// TODO: make sure controller/model does not depend on the view.

function init(projectList) {
    // load data
    // populate content on page 
    // set up event listeners
    initListeners(projectList);
    initForms(projectList);
}   

const mainProjects = new ProjectList();
const other = new Project("Other", "Tasks that are not assigned to a project");
const otherTask = new Task('other task', 'test test', '2024-11-22', 'low');
other.addTask(otherTask);
mainProjects.addProject(other);


const homework = new Project("Homework", "testing bro");
const task1 = new Task('odin project', 'complete faster', '2024-12-10', 'high');
homework.addTask(task1);
homework.addTask(new Task("C++", "learn about asynchonous execution", "2024-12-12", 'high'));
mainProjects.addProject(homework);




const projContainer = document.getElementById('projects-inner');
const projCards = buildProjectCardList(mainProjects.projects);
renderProjects(projCards, projContainer);

const tasksContainer = document.getElementById('tasks-container');
const taskCards = buildTaskCardList(homework.taskList);
renderTasks(taskCards, tasksContainer);

init(mainProjects);

export {mainProjects, tasksContainer, taskCards};