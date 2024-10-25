import Task from "./task";
import Project from "./project";
import ProjectList from "./projectList";
function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
}

function saveToLocal(projectListObj) {
    if (storageAvailable("localStorage")) {
        console.log('saveToLocal: localStorage available');
        const JSONProjList = JSON.stringify(projectListObj, null, 2);
        // console.log(`saveToLocal: stringified ProjList ${JSONProjList}`);
        localStorage.setItem('storedData', JSONProjList);
        console.log(`local storage after saving ${localStorage.getItem('storedData')}`);
    }
}

// change this something returned rather than editing
function loadFromLocal(projectsList) {
    if (storageAvailable("localStorage")) {
        console.log(`access to local storage!`);
      
      if (!localStorage.getItem('storedData')) {
        console.log(`local data not found, so saving to local data`);
        saveToLocal(projectsList);
      } else {
        const newProjectList = JSONToProjectList(localStorage.getItem('storedData'));

        return newProjectList;
      }
    }
}

function JSONToProjectList(JSONFile) {
  const parsed = JSON.parse(JSONFile);

  const projectList = new ProjectList();
  parsed.projects.forEach(proj => {
    const newProj = new Project(proj.title, proj.description);
    proj.taskList.forEach(task => {
      const newTask = new Task(task.title, task.description, 
        task.dueDate, task.priority, task.projectList, task.isComplete);
        newProj.addTask(newTask);

    });

    projectList.addProject(newProj);
  });
  console.log(`created newProjectList from JSON`);
  return projectList;
}



export { saveToLocal, loadFromLocal, storageAvailable, JSONToProjectList };