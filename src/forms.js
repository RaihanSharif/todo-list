

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
// TODO: populate the second form and other stuff
export { initForms };