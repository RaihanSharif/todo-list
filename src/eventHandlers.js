import { buildTaskCardList, populateTaskForm } from "./DOMBuilders.js"
import { renderTasks } from "./render.js"
import Task from "./task.js";

function newTaskHandler() {
    const taskModal = document.getElementById('new-task-modal');
    taskModal.showModal();
}



function newTaskSubmitHandler(form, projectList, container) {
    
    const data = Object.fromEntries(new FormData(form));

    const newTask = new Task(data.title, data.description, data.dueDate, data.priority);
    const proj = projectList.getProject(data.project);
    proj.addTask(newTask);
    const cards = buildTaskCardList(proj.taskList);
    renderTasks(cards, container);
}

function editTaskHandler(event) {

}

function deleteTaskHandler(event) {

}

function moveTaskHandler(event) {

}

function newProjectHandler(event) {

}

function showProjectTasksHandler(event, project, taskContainer) {
    if (event.target.classList.contains('project-name')) {
        const taskCards = buildTaskCardList(project.taskList);
        renderTasks(taskCards, taskContainer);
    }
}

/**
 * 
 * @param {object} event 
 * @param {object} projectList object
 */
function deleteProjectHandler(event, projectList) {
    const target = event.target;
    if (target.classList.contains('delete-project')) {
        const temp = projectList.getProject(target.dataset.title);

        // TODO: remove task cards of this project only
        const taskContainer = document.getElementById('tasks-container');
        while(taskContainer.firstChild) {
            taskContainer.removeChild(taskContainer.firstChild);
        }
        const remEl = target.parentNode;
        remEl.parentNode.removeChild(remEl);
    }
}

function renameProjectHandler(event) {

}

function displayAllTasksHandler(event) {

}

function initListeners(projList) {
    const projContainer = document.getElementById('projects-inner');
    const taskContainer = document.getElementById('tasks-container');
    const newTaskBtn = document.getElementById('new-task-btn');

    const newTaskModal = document.getElementById('new-task-modal');
    const newTaskForm = newTaskModal.querySelector('#new-task-form');

    projContainer.addEventListener('click', (ev) => {
        deleteProjectHandler(ev, projList);
        
        const proj = projList.getProject(ev.target.dataset.title);
        showProjectTasksHandler(ev, proj, taskContainer);
    });

    newTaskBtn.addEventListener('click', () => {
        newTaskHandler();
    });

    newTaskForm.addEventListener('submit', () => {
        newTaskSubmitHandler(newTaskForm, projList, taskContainer);
    });


}

export {initListeners};