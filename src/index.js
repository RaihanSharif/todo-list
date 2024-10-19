// the main js file
import "./styles.css";

// TODO: make sure controller/model does not depend on the view.

//default importing an image example. can be used as src of img html element
// import odingImage from "./oding.png";

const projectsList = [];

function addNewProject(project) {
    const exists = projectsList.find(({ title }) => project.title === title);

    if (exists) {
        console.log(`project already exists`);
        return 0;
    }
    projectsList.push(project);
}

renderTasks()