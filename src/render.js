// TODO: use font-awesome icons

import Project from "./project";
import Task from "./task";

import { mainProjects } from "./index.js";

//TODO: create a separate function for population project select options in the forms.

function createTaskCard(task) {
    const card = document.createElement("div");
    card.classList.add('task-card');
    card.setAttribute('data-title', task.title);
    card.setAttribute('data-isChecked', false);

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = task.title;
    taskTitle.classList.add('task-title');

    const taskCheckbox = document.createElement("input");
    taskCheckbox.setAttribute('type', 'checkbox');
    taskCheckbox.classList.add('task-checkbox');
    taskCheckbox.setAttribute('data-title', task.title);
    taskCheckbox.name = 'task-checkbox';

    // if checkbox is checked, the task is marked as completed
    // the card gets a isChecked = true, data
    // tested - works 
    taskCheckbox.addEventListener('change', () => {
        if (taskCheckbox.checked) {
            task.isComplete = true;
            card.dataset.isChecked = true;
        } else {
            task.isComplete = false;
            card.dataset.isChecked = false;

        }
    });

    const taskDesc = document.createElement('p');
    taskDesc.textContent = task.description;
    taskDesc.classList.add("task-desc");

    const taskDate = document.createElement('span');  //TODO: change to date/time tag later
    taskDate.textContent = `Due: ${task.dueDate}`;
    taskDate.classList.add('task-due-date');

    const taskPriority = document.createElement('div');
    taskPriority.classList.add('task-priority'); // TODO: color of div will change based on value
    taskPriority.setAttribute('data-priority', task.priority);
    taskPriority.textContent = task.priority; //TODO: this may be a number that needs to be turned into text {low, medium, high}

    const taskEdit = document.createElement('span'); // TODO: change to div?
    taskEdit.classList.add("task-edit", "fa-solid", "fa-edit");
    taskEdit.setAttribute('data-title', task.title);
    // TODO: add edit button event listener.

    const taskDel = document.createElement('span');
    taskDel.classList.add('task-del', 'fa-solid', 'fa-trash');
    taskDel.setAttribute('data-title', task.title);

    card.appendChild(taskCheckbox);
    card.appendChild(taskTitle);
    card.appendChild(taskDesc);
    card.appendChild(taskDate);
    card.appendChild(taskPriority);
    card.appendChild(taskEdit);
    card.appendChild(taskDel);

    return card;
}

function updateTask(task, data) {
    task.title = data.title;
    task.description = data.description;
    task.dueDate = data.dueDate;
    task.priority = data.priority;
}

function renderProjectTasks(project) {
    const taskDisplay = document.getElementById("content");
    const projName = document.createElement('h2');
    const taskEditModal = document.getElementById('edit-task-modal');
    const taskEditForm = document.getElementById('edit-task-form');


    taskDisplay.innerHTML = '';
    projName.classList.add('tasks-header');
    projName.id = project.title;
    projName.textContent = project.title;

    taskDisplay.appendChild(projName);
    project.taskList.forEach(task => {
        const newTask = createTaskCard(task);
        taskDisplay.appendChild(newTask);

        newTask.addEventListener('click', (ev) =>{
            const targ = ev.target;
            if (targ.classList.contains('task-del')) {
                project.removeTask(task);
                taskDisplay.removeChild(newTask);
            };
            if (targ.classList.contains('task-edit')) {
                populateTaskEditForm(task, taskEditForm);
                taskEditModal.showModal();
                taskEditForm.addEventListener('submit', () => {
                    const data = Object.fromEntries(new FormData(taskEditForm));
                    updateTask(task, data);
                    renderProjectTasks(project);
                }, {once: true});
            }
            
        });
    });
}

function populateTaskEditForm(task, editForm) {
    const title = editForm.elements['title'];
    title.value = task.title;

    const description = editForm.elements['description'];
    description.value = task.description;
    
    // TODO: populating the project section problems
    // changing the project means moving the task from the current 
    // project to another project.

    // projectSelectOptions(editForm);

    const date = editForm.elements['dueDate'];
    date.value = task.dueDate;


    const priority = editForm.elements['priority'];
    // correctly selects the prexisting priority as the default value
    for (let i = 0; i < priority.options.length; i++) {
        let opt = priority.options[i].textContent;
        let prev = task.priority;
        if(opt === prev) {
            priority.selectedIndex = i;
        }
    }
}


function createProjectCard(project) {
    const li = document.createElement("li");
    li.classList.add("project-card");
    li.setAttribute('data-title', project.title); //TODO: project[title] ???

    const projectName = document.createElement("p");
    projectName.textContent = project.title;
    projectName.addEventListener('click', () => {
        renderProjectTasks(project);
    });
    li.appendChild(projectName);
    
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("fa-solid", "fa-trash", "del-proj");
    deleteBtn.setAttribute('data-title', project.title);
    // TODO: if project is not empty, give a prompt to move tasks or cancel deletion
    li.appendChild(deleteBtn);
    return li;
}

// take a ProjectList object and container element and returns a UL
function renderProjects(projectList, containerElem) {
    containerElem.innerHTML = "";
    const projectsUl = document.createElement("ul");
    projectsUl.classList.add("menu");
    projectsUl.setAttribute('id', "projects-ul");

    projectList.projects.forEach(element => {
        const card = createProjectCard(element);
        projectsUl.appendChild(card);
    });

    // for deleting projects
    projectsUl.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains("del-proj")){
            const proj = projectList.getProject('title', target.dataset.title);
            projectList.removeProject(proj);
            renderProjects(projectList, containerElem);
        }
    })
    containerElem.appendChild(projectsUl);
    return projectsUl;
}

// TODO: error when creating empty project. Need to validate input
function renderNewProject(projectList, containerElem) {
    const newProjBtn = document.getElementById("new-project-btn");
    newProjBtn.addEventListener('click', () => {
        let title = prompt('Project title:');
        
        // prevent empty projects being added
        while (title === '') {
            title = prompt('please enter a title to continue, or press cancel');
        }

        if (title === null) {
            return 0;
        }

        const desc = prompt('Project description:');
        const newProj = new Project(title, desc);
        const added = projectList.addProject(newProj);
        if (added) {
            renderProjects(projectList, containerElem);
        } else {
            alert("project already exists");
        }
    });
    
}

// TODO: Too many things in one function
function renderNewTask(projectList) {
    const newTaskBtn = document.getElementById('new-task-btn');
    const modal = document.getElementById("new-task-modal");
    const taskForm = modal.querySelector("#new-task-form");
    const submitBtn = modal.querySelector("#submit");

    const projectSelect = taskForm.querySelector('#project');
    const cancelBtn = modal.querySelector("#close-modal-btn");

    cancelBtn.addEventListener("click", () => {
        modal.close("cancelled");
    });
    

    //TODO: move this out of here
    newTaskBtn.addEventListener('click', () => {
        projectSelect.innerHTML = '';
        projectList.projects.forEach(proj => {
            const opt = document.createElement("option");
            opt.value = proj.title;
            opt.textContent = proj.title;
            projectSelect.appendChild(opt);
        });
        modal.showModal();
    });

    submitBtn.addEventListener('click', () => {
        const data = Object.fromEntries(new FormData(taskForm));
        const newTask = new Task(data.title, data.description, data.dueDate, data.priority);
        
        const proj = projectList.getProject('title', data.project);
        proj.addTask(newTask);
        renderProjectTasks(proj);
        modal.close();
    });

}

function displayAllTasks() {
    console.log('asdas');
    mainProjects.projects.forEach(project => {
        const projectDisplayed = document.getElementsByClassName('tasks-header');
        console.log(projectDisplayed);
    });
}



export {renderProjects, renderNewProject, renderNewTask, renderProjectTasks};