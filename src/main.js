// import '../style.css'
import * as functions from '../js/functions.js';


const taskListContainer = document.querySelector("#allTasks");
const addTaskInput = document.querySelector("#addTask");
const addTaskForm = document.querySelector("#addTaskForm");
const filters = document.querySelector(".filters");
const itemsLeft = document.querySelector(".itemsLeft");
const toggleAll = document.querySelector(".arr");
// const editInputs = document.querySelectorAll("")
let tasksName = document.querySelectorAll("label");
let currentFilter = "all";




addTaskForm.addEventListener("submit", (e) => functions.newTask(e, addTaskInput, taskListContainer, currentFilter, itemsLeft, tasksName));


taskListContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const id = e.target.getAttribute("data-id");
        functions.removeTask(id, taskListContainer, currentFilter, itemsLeft);
    }
});

taskListContainer.addEventListener("dblclick", (e) => {
    if (e.target.tagName === "LABEL") {
        const theId = e.target.getAttribute("data-id");
        const theValue = e.target.textContent;
        functions.changeTaskName(theId, theValue, currentFilter, taskListContainer);
    }
});

filters.addEventListener("click", (e) => {
    if (!e.target.hasAttribute("filter")) {
       [...filters.children].forEach(child => child.removeAttribute("filter"));

        e.target.setAttribute("filter", "selected");
    };

    if (e.target.textContent === "Active") {
        currentFilter = "active";
        functions.activeTasks(taskListContainer, itemsLeft);
    } else if (e.target.textContent === "Completed") {
        currentFilter = "completed";
        functions.completedTasks(taskListContainer, itemsLeft);
    } else {
        currentFilter = "all";
        functions.renderAllTask(taskListContainer, tasksName);
    }
})

taskListContainer.addEventListener("click", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
        functions.changeTaskStatus(e.target.dataset.id, taskListContainer, currentFilter);
    }
});


toggleAll.addEventListener("click", (e) => {
    functions.toggleAllTask(taskListContainer)
})


tasksName.forEach(task => task.addEventListener("dblclick", (e) => {
    // functions.changeTaskName()
    alert("Hello")
}))