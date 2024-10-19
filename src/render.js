// TODO: use font-awesome icons



// builder builds the elements, render decides where the cards are shown
// render should not build or do other things. Just display supplied DOM content

/**
 * Takes in an array of task cards and a DOM element
 * appends the task cards to the DOM element
 * @param {array} cardsArray 
 * @param {object} DOMcontainerElem 
 */
function renderTasks(cardsArray, DOMcontainerElem) {
    DOMcontainerElem.innerHTML = '';
    cardsArray.forEach(elem => {
        DOMcontainerElem.appendChild(elem);
    });
}

/*
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
        const newTask = buildTaskCard(task);
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

*/



function renderProjects(projectCardList, DOMcontainer) {
    DOMcontainer.innerHTML = '';
    projectCardList.forEach(projCard => {
        DOMcontainer.appendChild(projCard);
    });
}


// take a ProjectList object and container element and returns a UL
// function renderProjects(projectList, containerElem) {
//     containerElem.innerHTML = "";
//     const projectsUl = document.createElement("ul");
//     projectsUl.classList.add("menu");
//     projectsUl.setAttribute('id', "projects-ul");

//     projectList.projects.forEach(element => {
//         const card = createProjectCard(element);
//         projectsUl.appendChild(card);
//     });

//     // for deleting projects
//     projectsUl.addEventListener('click', (e) => {
//         const target = e.target;
//         if (target.classList.contains("del-proj")){
//             const proj = projectList.getProject('title', target.dataset.title);
//             projectList.removeProject(proj);
//             renderProjects(taskCards, containerElem);
//         }
//     })
//     containerElem.appendChild(projectsUl);
//     return projectsUl;
// }

// TODO: error when creating empty project. Need to validate input
// function renderNewProject(projectList, containerElem) {
//     const newProjBtn = document.getElementById("new-project-btn");
//     newProjBtn.addEventListener('click', () => {
//         let title = prompt('Project title:');
        
//         // prevent empty projects being added
//         while (title === '') {
//             title = prompt('please enter a title to continue, or press cancel');
//         }

//         if (title === null) {
//             return 0;
//         }

//         const desc = prompt('Project description:');
//         const newProj = new Project(title, desc);
//         const added = projectList.addProject(newProj);
//         if (added) {
//             renderProjects(projectList, containerElem);
//         } else {
//             alert("project already exists");
//         }
//     });
    
// }

// // TODO: Too many things in one function
// function renderNewTask(projectList) {
//     const newTaskBtn = document.getElementById('new-task-btn');
//     const modal = document.getElementById("new-task-modal");
//     const taskForm = modal.querySelector("#new-task-form");
//     const submitBtn = modal.querySelector("#submit");

//     const projectSelect = taskForm.querySelector('#project');
//     const cancelBtn = modal.querySelector("#close-modal-btn");

//     cancelBtn.addEventListener("click", () => {
//         modal.close("cancelled");
//     });
    

//     //TODO: move this out of here
//     newTaskBtn.addEventListener('click', () => {
//         projectSelect.innerHTML = '';
//         projectList.projects.forEach(proj => {
//             const opt = document.createElement("option");
//             opt.value = proj.title;
//             opt.textContent = proj.title;
//             projectSelect.appendChild(opt);
//         });
//         modal.showModal();
//     });

//     submitBtn.addEventListener('click', () => {
//         const data = Object.fromEntries(new FormData(taskForm));
//         const newTask = new Task(data.title, data.description, data.dueDate, data.priority);
        
//         const proj = projectList.getProject('title', data.project);
//         proj.addTask(newTask);
//         renderTasks(taskCards, tasksContainer);
//         modal.close();
//         console.log(`after submit`);
//         console.log(tasksContainer);
//     });

// }


export {renderProjects, renderTasks,};