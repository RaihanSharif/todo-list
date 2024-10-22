// TODO: don't need two forms, just a task form, which is populated when editing, just
// the submit handling needs to change.

function buildProjctSelectInput(projList, form) {
    const projSelect = form.querySelector('#project');
    while(projSelect.firstChild) {
        projSelect.remove(projSelect.firstChild);
    }
    projList.projects.forEach(proj => {
        const opt = document.createElement('option');
        opt.value = proj['title'];
        opt.textContent = proj['title'];
        projSelect.appendChild(opt);
    });
    projSelect.selectedIndex = 0;
}

function populateEditTaskForm(task, editForm) {
    const title = editForm.elements['title'];
    title.value = task.title;
    title.defaultValue = task.title;

    const description = editForm.elements['description'];
    description.value = task.description;
 
    const date = editForm.elements['dueDate'];
    date.value = task.dueDate;
    console.log(task.dueDate);

    const priority = editForm.elements['priority'];
    // can't just set directly with priority = task.priority;
    for (let i = 0; i < priority.options.length; i++) {
        let opt = priority.options[i].value;
        let prev = task.priority;
        if(opt === prev) {
            priority.selectedIndex = i;
        }
    }

    const project = editForm.elements['project'];
    project.defaultValue = task.project;  // this is project of the task before it is changed by the user

    for (let i = 0; i < project.options.length; i++) {
        let opt = project.options[i].textContent;
        if (opt === task.project) {
            project.selectedIndex = i;
        }
    }
}

function initForms(projList) {
    const newTaskForm = document.getElementById('new-task-form');
    const editTaskForm = document.getElementById('edit-task-form');
    buildProjctSelectInput(projList, newTaskForm);
    buildProjctSelectInput(projList, editTaskForm);
}

export { initForms, populateEditTaskForm };