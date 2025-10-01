let taskList = [];


export const renderAllTask = (taskListContainer) => {
    taskListContainer.innerHTML = "";
    taskList.map(task => {
        taskListContainer.innerHTML += `
        <div class="task">
            <input type="checkbox" data-id="${task.id}" ${task.isCompleted? "checked" : ""} />
            <label>${task.value}</label>
            <button class="delete" data-id="${task.id}">X</button>
        </div>
        `
    })
    return taskList.length;
} 

export const newTask = (e, addTaskInput, taskListContainer, currentFilter) => {
    e.preventDefault();

    if(addTaskInput.value) {
        const newTaskValue = {
            id: crypto.randomUUID(),
            value: addTaskInput.value,
            isCompleted: false
        };

        taskList = [...taskList, newTaskValue];
        // renderAllTask(taskListContainer);

        if (currentFilter === "active") {
            activeTasks(taskListContainer);
        } else if (currentFilter === "completed") {
            completedTasks(taskListContainer);
        } else {
            renderAllTask(taskListContainer);
        }
        addTaskInput.value = ""
    }

}

export const removeTask = (theId, taskListContainer, currentFilter) =>  {
    taskList = taskList.filter(task => task.id !== theId);

    if (currentFilter === "active") {
        activeTasks(taskListContainer);
    } else if (currentFilter === "completed") {
        completedTasks(taskListContainer);
    } else {
        renderAllTask(taskListContainer);
    }
}

export const activeTasks = (taskListContainer) => {
    let activeList = taskList.filter(task => task.isCompleted === false);
    taskListContainer.innerHTML = "";

    activeList.map(task => {
        taskListContainer.innerHTML += `
        <div class="task">
            <input type="checkbox" data-id="${task.id}" ${task.isCompleted? "checked" : ""} />
            <label>${task.value}</label>
            <button class="delete" data-id="${task.id}">X</button>
        </div>
        `
    })

    return activeList.length;
}

export const completedTasks = (taskListContainer) => {
    let completedList = taskList.filter(task => task.isCompleted === true);
    taskListContainer.innerHTML = "";

    completedList.map(task => {
        taskListContainer.innerHTML += `
        <div class="task">
            <input type="checkbox" data-id="${task.id}" ${task.isCompleted? "checked" : ""} />
            <label>${task.value}</label>
            <button class="delete" data-id="${task.id}">X</button>
        </div>
        `
    })
    return completedList.length;
}

export const changeTaskStatus = (theId, taskListContainer) => {
    taskList = taskList.map(task =>  
        task.id === theId ? 
        {...task, isCompleted: !task.isCompleted} : task
    )

    taskListContainer.innerHTML = "";

    taskList.map(task => {
        taskListContainer.innerHTML += `
        <div class="task">
            <input type="checkbox" data-id="${task.id}" ${task.isCompleted? "checked" : ""} />
            <label>${task.value}</label>
            <button class="delete" data-id="${task.id}">X</button>
        </div>
        `
    })
}

export const toggleAllTask = (taskListContainer) => {    
    if (taskList && taskList.length > 0) {
        taskList = taskList.map(task => ({
            ...task,
            isCompleted: !task.isCompleted
        })

    )

    renderAllTask(taskListContainer);
}
}