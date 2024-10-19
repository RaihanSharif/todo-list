import { buildTaskCardList } from "./DOMBuilders.js"
import { renderTasks } from "./render.js"

function newTaskHandler(event) {
    // button is clicked
    // create new task
    // create card
    // render the tasks of the relevant project
    // success message
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
    // if event target class contains del
    //  get data-title
        // get ProjectList
        // delete project from projectList
        // prompt stuff later
    const target = event.target;
    if (target.classList.contains('delete-project')) {
        const temp = projectList.getProject(target.dataset.title);
        projectList.removeProject(temp);

        // TODO: remove task cards of this project
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
    projContainer.addEventListener('click', (ev) => {
        console.log('trigger click');
        deleteProjectHandler(ev, projList);
    });

    projContainer.addEventListener('click', (ev) => {
        const proj = projList.getProject(ev.target.dataset.title);
        showProjectTasksHandler(ev, proj, taskContainer);
    });
}

export {initListeners};