let taskList = [];


export const renderAllTask = (taskListContainer, itemsLeft) => {
    taskListContainer.innerHTML = "";
    taskList.map(task => {
        taskListContainer.innerHTML += `
        <div class="task">
            <input type="checkbox" data-id="${task.id}" ${task.isCompleted? "checked" : ""} />
            <label data-id="${task.id}">${task.value}</label>
            <button class="delete" data-id="${task.id}">X</button>
            <input type="text" class="edit" value="${task.value}" data-id="${task.id}" />
        </div>
        `
    })
    return taskList.length;
} 

export const newTask = (e, addTaskInput, taskListContainer, currentFilter, itemsLeft) => {
    e.preventDefault();
    

    if(addTaskInput.value) {
        const newTaskValue = {
            id: crypto.randomUUID(),
            value: addTaskInput.value,
            isCompleted: false
        };

        taskList = [...taskList, newTaskValue];
        // renderAllTask(taskListContainer);
        addTaskInput.value = ""

        if (currentFilter === "active") {
            activeTasks(taskListContainer);
        } else if (currentFilter === "completed") {
            completedTasks(taskListContainer);
        } else {
            renderAllTask(taskListContainer);
        }
        itemsLeft.innerHTML = `${taskList.length} item${taskList.length > 1? "s" : ""} left`;
    }

}

export const removeTask = (theId, taskListContainer, currentFilter, itemsLeft) =>  {
    taskList = taskList.filter(task => task.id !== theId);
    itemsLeft.innerHTML = `${taskList.length} item${taskList.length > 1? "s" : ""} left`;

    if (currentFilter === "active") {
        activeTasks(taskListContainer);
    } else if (currentFilter === "completed") {
        completedTasks(taskListContainer);
    } else {
        renderAllTask(taskListContainer);
    }
}

export const activeTasks = (taskListContainer, itemsLeft) => {
    let activeList = taskList.filter(task => task.isCompleted === false);
    taskListContainer.innerHTML = "";

    activeList.map(task => {
        taskListContainer.innerHTML += `
        <div class="task">
            <input type="checkbox" data-id="${task.id}" ${task.isCompleted? "checked" : ""} />
            <label data-id="${task.id}">${task.value}</label>
            <button class="delete" data-id="${task.id}">X</button>
            <input type="text" class="edit" value="${task.value}" data-id="${task.id}" />
        </div>
        `
    })
    itemsLeft.innerHTML = `${activeList.length} item${activeList.length > 1? "s" : ""} left`;
    return activeList.length;
}

export const completedTasks = (taskListContainer, itemsLeft) => {
    let completedList = taskList.filter(task => task.isCompleted === true);
    taskListContainer.innerHTML = "";

    completedList.map(task => {
        taskListContainer.innerHTML += `
        <div class="task">
            <input type="checkbox" data-id="${task.id}" ${task.isCompleted? "checked" : ""} />
            <label data-id="${task.id}">${task.value}</label>
            <button class="delete" data-id="${task.id}">X</button>
            <input type="text" class="edit" value="${task.value}" data-id="${task.id}" />
        </div>
        `
    })

    itemsLeft.innerHTML = `${completedList.length} item${completedList.length > 1? "s" : ""} left`;
    return completedList.length;
}

export const changeTaskStatus = (theId, taskListContainer, currentFilter) => {
    taskList = taskList.map(task =>  
        task.id === theId ? 
        {...task, isCompleted: !task.isCompleted} : task
    )

    taskListContainer.innerHTML = "";

    // taskList.map(task => {
    //     taskListContainer.innerHTML += `
    //     <div class="task">
    //         <input type="checkbox" data-id="${task.id}" ${task.isCompleted? "checked" : ""} />
    //         <label data-id="${task.id}">${task.value}</label>
    //         <button class="delete" data-id="${task.id}">X</button>
    //         <input type="text" class="edit" value="${task.value}" data-id="${task.id}" />
    //     </div>
    //     `
    // })
    if (currentFilter === "active") {
        activeTasks(taskListContainer);
    } else if (currentFilter === "completed") {
        completedTasks(taskListContainer);
    } else { 
        renderAllTask(taskListContainer);
    }
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

export const changeTaskName = (theId, theValue, currentFilter, taskListContainer) => {
    // alert(theId);
    document.querySelector(`input.edit[data-id="${theId}"]`).classList.remove("edit");

    let crrntInput = document.querySelector(`input[type="text"][data-id="${theId}"]`);

    crrntInput.classList.add("editing")
    document.querySelectorAll(".task").forEach(task => task.style.paddingInline = "0");
    crrntInput.focus();
    crrntInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            const newValue = e.target.value;
            taskList = taskList.map(task =>
                task.id == theId ? { ...task, value: newValue } : task
            );
            console.log(taskList)
            if(currentFilter === "active") {
                activeTasks(taskListContainer);
            } else if(currentFilter === "completed") {
                completedTasks(taskListContainer);
            } else {
                renderAllTask(taskListContainer);
            }


            crrntInput.classList.remove("editing");
            crrntInput.classList.add("edit");
            document.querySelectorAll(".task").forEach(task => task.style.paddingInline = "10px");
        } else if (e.key === "Escape") {
            crrntInput.classList.remove("editing");
            crrntInput.classList.add("edit");
            document.querySelectorAll(".task").forEach(task => task.style.paddingInline = "10px");
        }
    })
} 