

function initForms(projList) {
    const newTaskForm = document.getElementById('new-task-form');
    const editTaskForm = document.getElementById('edit-task-form');
    buildProjctSelectInput(projList, newTaskForm);
    buildProjctSelectInput(projList, editTaskForm);
}

function buildProjctSelectInput(projList, form) {
    const projSelect = form.querySelector('#project');
    projList.projects.forEach(proj => {
        const opt = document.createElement('option');
        opt.value = proj['title'];
        opt.textContent = proj['title'];
        projSelect.appendChild(opt);
    });
    projSelect.selectedIndex = 0;
}

function populateEditTaskForm(task, editForm) {
    const title = editForm.elements['title'];  //TODO: these two lines as one line
    title.value = task.title;
    title.defaultValue = task.title;

    const description = editForm.elements['description'];
    description.value = task.description;
 
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
    const project = editForm.elements['project'];
    project.defaultValue = task.project;  // this is project of the task before it is changed by the user

    for (let i = 0; i < project.options.length; i++) {
        let opt = project.options[i].textContent;
        if (opt === task.project) {
            project.selectedIndex = i;
        }
    }
}
// TODO: populate the second form and other stuff
export { initForms, populateEditTaskForm };