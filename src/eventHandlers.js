import { buildTaskCardList } from "./DOMBuilders.js"
import { renderTasks } from "./render.js"
import Task from "./task.js";
import { populateEditTaskForm } from "./forms.js"

function showNewTaskFormModal() {
    const taskModal = document.getElementById('new-task-modal');
    taskModal.showModal();
}

function newTaskSubmitHandler(form, projectList, container) {
    
    const data = Object.fromEntries(new FormData(form));

    const newTask = new Task(data.title, data.description, data.dueDate, data.priority, data.project);
    const proj = projectList.getProject(data.project);
    proj.addTask(newTask);
    const cards = buildTaskCardList(proj.taskList);
    renderTasks(cards, container); //TODO: make a function to delete a single card from the current task-container
}

// TODO: use the while loop to get the task card. Store all the data attributes to the card,
// rather than the edit and delete buttons
function showEditTaskFormModal(ev, projList, form, modal) {
    if (ev.target.classList.contains('task-edit')){
        let parent = ev.target.parentElement;
        while (!parent.classList.contains('task-card')) {
            parent = parent.parentElement;
        }
        const proj = projList.getProject(parent.dataset.project);
        const task = proj.getTask(parent.dataset.title);
        populateEditTaskForm(task, form);
        modal.showModal();
    }
}


function updateTask(task, data) {
    task.title = data.title;
    task.description = data.description;
    task.dueDate = data.dueDate;
    task.priority = data.priority;
    task.project = data.project;
}

function editTaskSubmitHandler(ev, projectList, form, container) {
    //find the appropriate task and project and update it.
    const data = Object.fromEntries(new FormData(form));

    // defaults are the old project title, and task title before they are edited
    const projectDefault = form.elements['project'].defaultValue;
    const taskDefault = form.elements['title'].defaultValue;
    
    const oldProject = projectList.getProject(projectDefault);
    const newProject = projectList.getProject(data.project);

    const task = oldProject.getTask(taskDefault);
    
    // get the task to be updated and change relevant values, except project.
    if (projectDefault != data.project) {
        const exists = newProject.getTask(data.title);
        if (exists) {
            console.log('task already exists in other project');
            return false;
        }
        updateTask(task, data);
        oldProject.moveTask(task.title, newProject);
        const cards = buildTaskCardList(newProject.taskList);
        renderTasks(cards, container);
    } else {
        updateTask(task, data);
        const cards = buildTaskCardList(oldProject.taskList);
        renderTasks(cards, container);
    }



    // if project is not the defaultValue
            // call moveTask()

}

function deleteTaskHandler(event, projectList, container) {
    const target = event.target;
    if (target.classList.contains('task-del')) {
        const proj = projectList.getProject(target.dataset.project);
        const task = proj.getTask(target.dataset.title);
        proj.removeTask(task);
        const cards = buildTaskCardList(proj.taskList);
        renderTasks(cards, container);
    }

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

function setupFormCancelBtn(modal) {
    const cancelBtn = modal.querySelector('#cancel');

    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        modal.close();
    });
}

function initListeners(projList) {
    const projContainer = document.getElementById('projects-inner');
    const taskContainer = document.getElementById('tasks-container');
    const newTaskBtn = document.getElementById('new-task-btn');

    const newTaskModal = document.getElementById('new-task-modal');
    const newTaskForm = newTaskModal.querySelector('#new-task-form');

    const editTaskModal = document.getElementById('edit-task-modal');
    const editTaskForm = document.getElementById('edit-task-form');

    projContainer.addEventListener('click', (ev) => {
        deleteProjectHandler(ev, projList);
        
        const proj = projList.getProject(ev.target.dataset.title);
        showProjectTasksHandler(ev, proj, taskContainer);
    });

    newTaskBtn.addEventListener('click', () => {
        showNewTaskFormModal();
    });

    newTaskForm.addEventListener('submit', () => {
        newTaskSubmitHandler(newTaskForm, projList, taskContainer);
    });

    setupFormCancelBtn(newTaskModal);
    setupFormCancelBtn(editTaskModal);

    taskContainer.addEventListener('click', (ev) => {
        deleteTaskHandler(ev, projList, taskContainer);
        showEditTaskFormModal(ev, projList, editTaskForm, editTaskModal);
    });

    editTaskForm.addEventListener('submit', (ev) => {
        editTaskSubmitHandler(ev, projList, editTaskForm, taskContainer);
    })


}

export {initListeners};