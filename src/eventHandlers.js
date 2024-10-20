import { buildProjectCard, buildTaskCardList } from "./DOMBuilders.js"
import { renderTasks } from "./render.js"
import Task from "./task.js";
import { populateEditTaskForm } from "./forms.js"
import Project from "./project.js";
import { initForms } from "./forms"
import { compareAsc, isAfter, isToday } from "date-fns"

function showNewTaskFormModal(projectList) {
    const taskModal = document.getElementById('new-task-modal');
    initForms(projectList);
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
        initForms(projList);
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

function editTaskSubmitHandler(projectList, form, container) {
    //find the appropriate task and project and update it.
    const data = Object.fromEntries(new FormData(form));

    // defaults are the old project title, and task title before they are edited
    const projectDefault = form.elements['project'].defaultValue;
    const taskDefault = form.elements['title'].defaultValue;
    
    const oldProject = projectList.getProject(projectDefault);
    const newProject = projectList.getProject(data.project);

    const task = oldProject.getTask(taskDefault);
    
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

function newProjectHandler(projectList, container) {
    const title = prompt("project title: ");
    while (title === '') {
        title = prompt('please enter a title to continue, or press cancel');
    }
    if (title === null) { return 0; }

    const desc = prompt('Project description:');
    const newProj = new Project(title, desc);
    const added = projectList.addProject(newProj);
    if (added) {
        const projCard = buildProjectCard(newProj);
        container.appendChild(projCard);
        initForms(projectList);
    } else {
        alert("project already exists");
    } 
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
        if (!confirm('if you delete the project, all tasks in this project will be deleted')){
            return false;
        }
        projectList.removeProject(temp);
        
        // empty the task container
        const taskContainer = document.getElementById('tasks-container');
        while(taskContainer.firstChild) {
            taskContainer.removeChild(taskContainer.firstChild);
        }

        // remove project from project container
        const remEl = target.parentNode;
        remEl.parentNode.removeChild(remEl);
    }
}

function renameProjectHandler(event) {

}

function displayAllTasksHandler(event, projectList, container) {
    const taskArr = projectList.getAllTasks();
    console.log(taskArr);
    const cards = buildTaskCardList(taskArr);
    renderTasks(cards, container)

}

function setupFormCancelBtn(modal) {
    const cancelBtn = modal.querySelector('#cancel');

    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        modal.close();
    });
}

function dueTodayHandler(projectList, container) {
    const allTasks = projectList.getAllTasks();

    const filteredTasks = allTasks.filter((elem) => {
        return isToday(new Date(elem['dueDate']));
    });
    const cards = buildTaskCardList(filteredTasks);
    renderTasks(cards, container)
}

function initListeners(projList) {
    const projContainer = document.getElementById('projects-inner');
    const newProjBtn = document.getElementById('new-project-btn');
    const taskContainer = document.getElementById('tasks-container');
    const newTaskBtn = document.getElementById('new-task-btn');

    const newTaskModal = document.getElementById('new-task-modal');
    const newTaskForm = newTaskModal.querySelector('#new-task-form');

    const editTaskModal = document.getElementById('edit-task-modal');
    const editTaskForm = document.getElementById('edit-task-form');

    const allTasksBtn = document.getElementById('show-all-tasks');
    const dueTodayBtn = document.getElementById('show-due-today');

    projContainer.addEventListener('click', (ev) => {
        deleteProjectHandler(ev, projList);
        
        const proj = projList.getProject(ev.target.dataset.title);
        showProjectTasksHandler(ev, proj, taskContainer);
    });

    newTaskBtn.addEventListener('click', () => {
        showNewTaskFormModal(projList);
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
        editTaskSubmitHandler(projList, editTaskForm, taskContainer);
    });

    newProjBtn.addEventListener('click', (ev) => {
        newProjectHandler(projList, projContainer);
    });

    allTasksBtn.addEventListener('click', (ev) => {
        displayAllTasksHandler(ev, projList, taskContainer);
    });

    dueTodayBtn.addEventListener('click', (ev) => {
        dueTodayHandler(projList, taskContainer);

    });
}

export {initListeners};