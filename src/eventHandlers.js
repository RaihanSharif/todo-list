import { buildProjectCard, buildTaskCardList } from "./DOMBuilders.js"
import { renderTasks } from "./render.js"
import Task from "./task.js";
import { populateEditTaskForm } from "./forms.js"
import Project from "./project.js";
import { initForms } from "./forms"
import { subDays, isToday, addWeeks, compareAsc } from "date-fns"
import { saveToLocal } from "./storeLocalData.js";

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
    renderTasks(cards, container); 
    saveToLocal(projectList);
}

// TODO: use the while loop to get the task card. Store all the data attributes to the card,
// rather than the edit and delete buttons
function showEditTaskFormModal(ev, projList, form, modal) {
    if (ev.target.classList.contains('task-edit')){
        let parent = ev.target.parentElement;
        while (!parent.classList.contains('task-card')) {
            parent = parent.parentElement;
        }
        console.log(parent);
        const proj = projList.getProject(parent.dataset.project);
        console.log("showEditForm: project");
        console.log(proj);
        const task = proj.getTask(parent.dataset.title);
        initForms(projList);
        populateEditTaskForm(task, form);
        modal.showModal();
    }
}

function editTaskSubmitHandler(projectList, form, container) {
    const data = Object.fromEntries(new FormData(form));

    // defaults are the old project title, and task title before they are edited
    const projectDefault = form.elements['project'].defaultValue;
    const taskDefault = form.elements['title'].defaultValue;
    
    const oldProject = projectList.getProject(projectDefault);
    const newProject = projectList.getProject(data.project);

    const task = oldProject.getTask(taskDefault);
    
    // if changing project, create new task with form data, and store in that new project.
    // then delete current task from its project.
    if (projectDefault != data.project) {
        const newTask = new Task();
        newTask.updateTask(data);

        // if new task added, render new project.
        if (newProject.addTask(newTask)) {
            oldProject.removeTask(task);
            const cards = buildTaskCardList(newProject.taskList);
            renderTasks(cards, container);
            
        } else {
            alert(`task with that title already exists in the ${newProject.title} project`);
        }
    } else {
        task.updateTask(data);
        const cards = buildTaskCardList(oldProject.taskList);
        renderTasks(cards, container);
    }
    saveToLocal(projectList);
}

function deleteTaskHandler(event, projectList, container) {
    const target = event.target;
    if (target.classList.contains('task-del')) {
        const proj = projectList.getProject(target.dataset.project);
        const task = proj.getTask(target.dataset.title);
        proj.removeTask(task);
        const cards = buildTaskCardList(proj.taskList);
        renderTasks(cards, container);
        saveToLocal(projectList);
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
        saveToLocal(projectList);
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
        saveToLocal(projectList);
    }
}

function renameProjectHandler(event) {

}

function displayAllTasksHandler(event, projectList, container) {
    if (event.target.id === 'show-all-tasks') {
        const taskArr = projectList.getAllTasks();
        const cards = buildTaskCardList(taskArr);
        renderTasks(cards, container)
    }

}

function setupFormCancelBtn(modal) {
    const cancelBtn = modal.querySelector('#cancel');

    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        modal.close();
    });
}

function dueTodayHandler(event, projectList, container) {
    if (event.target.id === 'show-due-today') {
        const allTasks = projectList.getAllTasks();
    
        const filteredTasks = allTasks.filter((elem) => {
            return isToday(new Date(elem['dueDate']));
        });
        const cards = buildTaskCardList(filteredTasks);
        renderTasks(cards, container)
    }
}

function dueThisWeekHandler(event, projectList, container) {
    if (event.target.id === 'show-due-this-week') {
        const dueBefore = addWeeks(new Date(), 1);  // this works

        const weekTasks = projectList.filterAllTasksByDueDate(dueBefore);
        const cards = buildTaskCardList(weekTasks);
        renderTasks(cards, container);
    }
}

function dueThisMonthHandler(event, projectList, container) {
    if (event.target.id === 'show-due-this-month') {
        const dueBefore = addWeeks(new Date(), 4);  // this works

        const monthTasks = projectList.filterAllTasksByDueDate(dueBefore, new Date());
        const cards = buildTaskCardList(monthTasks);
        renderTasks(cards, container);
    }
}

function overDueHandler(event, projectList, container) {    
    if (event.target.id === 'show-overdue') {
        const dueBefore = subDays(new Date(),1);
        const overdueTasks = projectList.filterAllTasksByDueDate(dueBefore);
        const uncompleted = overdueTasks.filter((elem) => {
            return !elem.isComplete;
        })
        const cards = buildTaskCardList(uncompleted);
        renderTasks(cards, container);
    }
}

function checkBoxHandler(event, projectList, container) {
    const target = event.target;
    if (target.classList.contains('task-checkbox')) {
        let parent = target.parentNode;
        while (!parent.classList.contains('task-card')) {
            parent = parent.parentNode;
        }

        const project = projectList.getProject(parent.dataset.project);
        const task = project.getTask(parent.dataset.title);

        task.isComplete = !task.isComplete;
        parent.classList.toggle('task-completed');
        console.log(parent.classList.ischecked === 'false');
        // BUG: shows up on console log but not on element view...
        if (parent.classList.ischecked === 'true') {
            parent.classList.ischecked = 'false';
        } else {
            parent.classList.ischecked = 'true';
        }

        // gets the last child of the container and moves the completed task to the bottom
        const lastchild = container.lastChild;
        lastchild.after(parent);
    }

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

    const filterMenu = document.getElementById('filter-tasks');

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
        checkBoxHandler(ev, projList, taskContainer);
    });

    editTaskForm.addEventListener('submit', (ev) => {
        editTaskSubmitHandler(projList, editTaskForm, taskContainer);
    });

    newProjBtn.addEventListener('click', (ev) => {
        newProjectHandler(projList, projContainer);
    });

    filterMenu.addEventListener('click', (ev) => {
        displayAllTasksHandler(ev, projList, taskContainer);
        dueTodayHandler(ev, projList, taskContainer);
        dueThisWeekHandler(ev, projList, taskContainer);
        dueThisMonthHandler(ev, projList, taskContainer);
        overDueHandler(ev, projList, taskContainer);
        
    });
}

export {initListeners};