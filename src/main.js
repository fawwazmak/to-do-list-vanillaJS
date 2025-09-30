// import '../style.css'
import * as functions from '../js/functions.js';


const taskListContainer = document.querySelector("#allTasks");
const addTaskInput = document.querySelector("#addTask");
const addTaskForm = document.querySelector("#addTaskForm");
const filters = document.querySelector(".filters");
const itemsLeft = document.querySelector(".itemsLeft");
const toggleAll = document.querySelector(".arr");
itemsLeft.innerHTML = `${functions.renderAllTask(taskListContainer)} item${functions.renderAllTask(taskListContainer) > 1? "s" : ""} left`;


addTaskForm.addEventListener("submit", (e) => functions.newTask(e, addTaskInput, taskListContainer));


taskListContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const id = e.target.getAttribute("data-id");
        functions.removeTask(id, taskListContainer);
    }
});

filters.addEventListener("click", (e) => {
    if (!e.target.hasAttribute("filter")) {
       [...filters.children].forEach(child => child.removeAttribute("filter"));

        e.target.setAttribute("filter", "selected");
    };

    if (e.target.textContent === "Active") {
        functions.activeTasks(taskListContainer);
        itemsLeft.innerHTML = `${functions.activeTasks(taskListContainer)} item${functions.activeTasks(taskListContainer) > 1? "s" : ""} left` ;
    } else if (e.target.textContent === "Completed") {
        functions.completedTasks(taskListContainer);
        itemsLeft.innerHTML = `${functions.completedTasks(taskListContainer)} item${functions.completedTasks(taskListContainer) > 1? "s" : ""} left` ;
    } else {
        functions.renderAllTask(taskListContainer);
        itemsLeft.innerHTML = `${functions.renderAllTask(taskListContainer)} item${functions.renderAllTask(taskListContainer) > 1? "s" : ""} left` ;
    }
})

taskListContainer.addEventListener("click", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
        functions.changeTaskStatus(e.target.dataset.id, taskListContainer);
    }
});


toggleAll.addEventListener("click", (e) => {
    functions.toggleAllTask(taskListContainer)
})


