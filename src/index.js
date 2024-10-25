// the main js file
import "./styles.css";
import Task from "./task.js";
import Project from "./project.js"
import ProjectList from "./projectList.js";
import {renderProjects, renderTasks } from "./render.js";
import { buildTaskCardList, buildProjectCardList } from "./DOMBuilders.js";
import { initListeners } from "./eventHandlers.js";
import { initForms } from "./forms.js"
import { saveToLocal, loadFromLocal, storageAvailable, JSONToProjectList } from "./storeLocalData.js";

const projContainer = document.getElementById('projects-inner');
const tasksContainer = document.getElementById('tasks-container');
const allTasksBtn = document.getElementById('show-all-tasks');  // click it on page load
let mainProjects = new ProjectList();


function demoData(projectsList)  {
  const other = new Project("Other", "Tasks that are not assigned to a project");
  projectsList.addProject(other);
  const otherTask = new Task('other task', 'test test', '2024-11-22', 'Low', 'Other');
  other.addTask(otherTask);
  
  const homework = new Project("Homework", "testing bro");
  const task1 = new Task('odin project', 'complete faster', '2024-07-10', 'High', 'Homework', true);
  homework.addTask(task1);
  homework.addTask(new Task("C++", "learn about asynchonous execution", "2024-12-12", 'Medium', 'Homework'));
  projectsList.addProject(homework);
}



// create the "Other" project and a demo task, save that to local data

function init(projectList) {
  
  
  if (!localStorage.getItem('storedData')) {
    console.log(`nothing in localStorage`);
    const otherProj = new Project("Other", "Tasks that are not assigned to a project");
    const otherTask = new Task('example task', 'detail of the task', '2024-11-22', 'Low', 'Other');
    otherProj.addTask(otherTask);
    projectList.addProject(otherProj);
    saveToLocal(projectList);    
  } else {
    const dataString = localStorage.getItem('storedData');
    console.log(`dataString: ${dataString}`);
    const projFromJSON = JSONToProjectList(dataString);
    console.log(projFromJSON.projects[0].taskList);
    projectList = projFromJSON;
  }  
  // try to load local data
  // if nothing there, save the demo data to localStorage
  // if there is something there load it, replace mainProjects, using JSONToProjectList 
  // inside loadFromLocal()
  initListeners(projectList);
  initForms(projectList);
  const projCards = buildProjectCardList(projectList.projects);
  renderProjects(projCards, projContainer);

  allTasksBtn.click();


}   

init(mainProjects);

