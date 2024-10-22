//TODO: make all this a single static class

// TODO: turn this into a card class 
// then taskCard and project Card can inherit from card
function buildTaskCard(task) {
    const card = document.createElement("div");
    card.classList.add('task-card');
    card.setAttribute('data-title', task.title);
    card.setAttribute('data-isChecked', false);
    card.setAttribute('data-project', task.project);

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
    // taskCheckbox.addEventListener('change', () => {
    //     if (taskCheckbox.checked) {
    //         task.isComplete = true;
    //         card.dataset.isChecked = true;
    //     } else {
    //         task.isComplete = false;
    //         card.dataset.isChecked = false;
    //     }
    // });

    if (task.isComplete) {
        taskCheckbox.checked = true;
        card.classList.toggle('task-completed');
    }

    const taskDesc = document.createElement('p');
    taskDesc.textContent = task.description;
    taskDesc.classList.add("task-desc");

    const taskDate = document.createElement('time'); 
    taskDate.textContent = task.dueDate;
    taskDate.setAttribute('datetime', task.dueDate);
    taskDate.classList.add('task-due-date');

    const taskPriority = document.createElement('div');
    taskPriority.classList.add('task-priority'); // TODO: color of div will change based on value
    taskPriority.setAttribute('data-priority', task.priority);
    taskPriority.textContent = task.priority; 

    const taskProject = document.createElement('span');
    taskProject.textContent = task.project;

    const taskEdit = document.createElement('span');
    taskEdit.classList.add("task-edit", "fa-solid", "fa-edit");
    taskEdit.setAttribute('data-title', task.title);

    const taskDel = document.createElement('span');
    taskDel.classList.add('task-del', 'fa-solid', 'fa-trash');
    taskDel.setAttribute('data-title', task.title);
    taskDel.setAttribute('data-project', task.project);

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('card-content-container');

    contentContainer.appendChild(taskCheckbox);
    contentContainer.appendChild(taskTitle);
    contentContainer.appendChild(taskDesc);
    contentContainer.appendChild(taskDate);
    contentContainer.appendChild(taskPriority);
    contentContainer.appendChild(taskProject);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(taskEdit);
    buttonContainer.appendChild(taskDel);

    card.appendChild(contentContainer);
    card.appendChild(buttonContainer);

    return card;
}

/**
 * @param Task[]
 * @returns array of task cards
 */
function buildTaskCardList(taskArray) {
    const cardsArray = [];
    taskArray.forEach(taskElem => {
        const temp = buildTaskCard(taskElem);
        if (taskElem.isComplete) {
            cardsArray.push(temp);
        } else {
            cardsArray.unshift(temp);
        }
    });
    return cardsArray;
}

function buildProjectCard(project) {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.setAttribute('data-title', project.title);

    const projName = document.createElement('p');
    projName.classList.add('project-name');
    projName.textContent = project.title;
    projName.setAttribute('data-title', project.title);

    card.appendChild(projName);
    

    if (project.title != 'Other') {
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('project-icon-container');    
        const projEdit = document.createElement('span');
        projEdit.classList.add('edit-project', 'fa-solid', 'fa-edit');
        projEdit.setAttribute('data-title', project.title);
        
        const projDel = document.createElement('span');
        projDel.classList.add('delete-project', 'fa-solid', 'fa-trash');
        projDel.setAttribute('data-title', project.title);
        card.appendChild(projEdit);
        card.appendChild(projDel);
    }



    return card;
}


function buildProjectCardList(projectArray) {
    const cardsArr = [];
    projectArray.forEach(projElem => {
        cardsArr.push(buildProjectCard(projElem));
    });
    return cardsArr;
}

export {buildTaskCard, buildTaskCardList, buildProjectCard, buildProjectCardList};