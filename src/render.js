// TODO: use font-awesome icons

import Project from "./project";

// create a project card that will be used to render projects list
function createProjectCard(project) {
    const li = document.createElement("li");
    li.classList.add("project-card");
    li.setAttribute('data-title', project.title); //TODO: project[title] ???

    // const icon = document.createElement("span");
    // icon.classList.add("fa-solid", "fa-folder");
    // li.appendChild(icon);

    const projectName = document.createElement("p");
    projectName.textContent = project.title;
    projectName.addEventListener('click', () => {
        // renderTasks(project);
        // TODO: function to render all tasks of a given projects
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
        console.log(`current project: ${element.title}`);
        const card = createProjectCard(element);
        projectsUl.appendChild(card);
    });

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

function renderNewProject(projectList, containerElem) {
    const newProjBtn = document.getElementById("new-project-btn");

    newProjBtn.addEventListener('click', () => {
        const title = prompt('Project title:');
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
export {renderProjects, renderNewProject};