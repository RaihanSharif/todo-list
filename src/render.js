

// builder defines functions to manipulate DOM the elements, render uses the builder to 
// display the dynamic content on the page

// TODO: create a TaskRender class
// save the task container dom element
// display a single or multiple task card
// delete a single or multiple tasks card
// refresh the task list

/**
 * Takes in an array of task cards and a DOM element
 * appends the task cards to the DOM element
 * @param {array} cardsArray 
 * @param {object} DOMcontainerElem 
 */
// TODO: change this. Take in an array instead, and make the container be tasks container by default
// no point supplying it every time.
function renderTasks(cardsArray, DOMcontainerElem) { 
    DOMcontainerElem.innerHTML = '';
    cardsArray.forEach(elem => {
        DOMcontainerElem.appendChild(elem);
    });
}


function renderProjects(projectCardList, DOMcontainer) { 
    DOMcontainer.innerHTML = '';
    projectCardList.forEach(projCard => {
        DOMcontainer.appendChild(projCard);
    });
}

export {renderProjects, renderTasks,};