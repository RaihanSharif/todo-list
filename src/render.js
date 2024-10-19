// TODO: use font-awesome icons

// builder builds the elements, render decides where the cards are shown
// render should not build or do other things. Just display supplied DOM content

/**
 * Takes in an array of task cards and a DOM element
 * appends the task cards to the DOM element
 * @param {array} cardsArray 
 * @param {object} DOMcontainerElem 
 */
function renderTasks(cardsArray, DOMcontainerElem) { // TODO: it might be better to just take an array of tasks instead of card array
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