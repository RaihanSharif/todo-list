//TODO: make all this a single static class

function buildTaskCard(task) {
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

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('card-content-container');


    contentContainer.appendChild(taskCheckbox);
    contentContainer.appendChild(taskTitle);
    contentContainer.appendChild(taskDesc);
    contentContainer.appendChild(taskDate);
    contentContainer.appendChild(taskPriority);

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
function buildTaskList(taskArray) {
    const cardsArray = [];
    taskArray.forEach(taskElem => {
        const temp = buildTaskCard(taskElem);
        cardsArray.push(temp);
    });
    return cardsArray;
}


function populateTaskForm(task, editForm) {
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


function buildProjectCard() {

}
export {buildTaskCard, buildTaskList, populateTaskForm};