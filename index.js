/* HELPER FUNCTIONS START */

const getIncompleteTasks = () => {
    return document.querySelectorAll(".task_list .task:has(input.task_completion_selector:not(:checked))");
}

const getCompletedTasks = () => {
    return document.querySelectorAll(".task_list .task:has(input.task_completion_selector:checked)");
}

const updateIncompleteTaskCount = () => {
    const incomplete_tasks = getIncompleteTasks();
    document.getElementById("incomplete_task_count").textContent = incomplete_tasks.length.toString();
}

const createTask = (task_title) => {
    const task_li = document.createElement("li");
    task_li.classList.add("task");

    // the checkbox is responsible to mark a task as complete or incomplete
    // filtering can also be done based on its status 
    const completion_checkbox   = document.createElement("input");
    completion_checkbox.type    = "checkbox";
    completion_checkbox.classList.add("task_completion_selector");
    task_li.appendChild(completion_checkbox);

    // icon to represent incomplete task
    const incomplete_task_icon          = document.createElement("span");
    incomplete_task_icon.title          = "Click to mark as complete";
    incomplete_task_icon.textContent    = "radio_button_unchecked";
    incomplete_task_icon.classList.add("material-symbols-rounded", "completion_indicator", "incomplete_task_indicator");
    incomplete_task_icon.addEventListener("click", setTaskStatus);
    task_li.appendChild(incomplete_task_icon);

    // icon to represent complete task
    const complete_task_icon        = document.createElement("span");
    complete_task_icon.title        = "Click to mark as incomplete";
    complete_task_icon.textContent  = "radio_button_checked";
    complete_task_icon.classList.add("material-symbols-rounded", "completion_indicator", "complete_task_indicator");
    complete_task_icon.addEventListener("click", setTaskStatus);
    task_li.appendChild(complete_task_icon);

    // show task name
    const task_name         = document.createElement("p");
    task_name.textContent   = task_title;
    task_name.classList.add("task_description");
    task_li.appendChild(task_name);

    // button to remove task from list
    const remove_task_button        = document.createElement("span");
    remove_task_button.title        = "Remove task";
    remove_task_button.textContent  = "cancel";
    remove_task_button.classList.add("material-symbols-rounded", "remove_task_button");
    remove_task_button.addEventListener("click", removeTask);
    task_li.appendChild(remove_task_button);

    return task_li;
}

const addTaskToList = (task_element) => {
    const task_list_container = document.querySelector("main .task_list");
    task_list_container.appendChild(task_element);
}

const setAllFiltersInactive = () => {
    const filters = document.querySelectorAll(".list_filters .filter");
    filters.forEach(filter => filter.classList.remove("active_filter"));
}

/* HELPER FUNCTIONS END */



/* EVENT HANDLERS START */

const setTaskStatus = (event) => {
    // checks or unchecks the task checkbox based on the previous value
    const checkbox_ele = event.target.parentElement.querySelector("input.task_completion_selector");
    checkbox_ele.checked = !checkbox_ele.checked;

    // update incomplete task count
    updateIncompleteTaskCount();
}

const removeTask = (event) => {
    // remove task from task list
    event.target.parentElement.remove();

    // update incomplete task count
    updateIncompleteTaskCount();
}

const formatAndAddTask = (event) => {
    const task_input_ele = document.getElementById("task_name");
    const task_title = task_input_ele.value;
    // check for null or empty spaces
    if(!task_title || !task_title.trim()) {
        alert("Please provide a task name.");
        return;
    }
    
    const task_element = createTask(task_title);
    addTaskToList(task_element);
    // clear input box after task creation
    task_input_ele.value = "";

    // update incomplete task count
    updateIncompleteTaskCount();
}

const completeAllTasks = (event) => {
    const incomplete_tasks = getIncompleteTasks();
    incomplete_tasks.forEach(task_ele => task_ele.querySelector("input.task_completion_selector").checked = true);

    // update incomplete task count
    updateIncompleteTaskCount();

    // filter tasks
    document.querySelector(".list_filters .active_filter").dispatchEvent(new Event("click"));
}

const removeCompleteTasks = (event) => {
    const completed_tasks = getCompletedTasks();
    completed_tasks.forEach(task_ele => task_ele.remove());

    // update incomplete task count
    updateIncompleteTaskCount();
}

/* EVENT HANDLERS END */



/* EVENT LISTENERS START */

// add new task to list when "add_task" button is click
document.getElementById("add_task").addEventListener("click", formatAndAddTask);

// add new task to list when "ENTER" pressed in input box
document.getElementById("task_name").addEventListener("keyup", (event) => {
    // check which key was pressed
    if(event.key == "Enter" || event.code === 13 ) {
        formatAndAddTask(event);
    }
});

// mark all tasks as complete on click
document.getElementById("complete_all").addEventListener("click", completeAllTasks);

// remove all completed tasks on click
document.getElementById("clear_completed").addEventListener("click", removeCompleteTasks);

// all filter
// display all tasks
document.querySelector(".list_filters .filter.all_tasks_filter").addEventListener("click", (event) => {

    // set all filters as inactive
    setAllFiltersInactive();
    // set current filter as active
    event.target.classList.add("active_filter");

    // show all tasks
    const all_tasks = document.querySelectorAll(".task_list .task");
    all_tasks.forEach(task_ele => {
        task_ele.style.display = "";
    });
});

// incomplete filter
// display only incomplete tasks
document.querySelector(".list_filters .filter.incomplete_tasks_filter").addEventListener("click", (event) => {
    
    // set all filters as inactive
    setAllFiltersInactive();
    // set current filter as active
    event.target.classList.add("active_filter");

    // show all tasks
    const all_tasks = document.querySelectorAll(".task_list .task");
    all_tasks.forEach(task_ele => {
        if(task_ele.querySelector("input.task_completion_selector:checked")){
            task_ele.style.display = "none";
        }else {
            task_ele.style.display = "";
        }
    });
});

// complete filter
// display only complete tasks
document.querySelector(".list_filters .filter.complete_tasks_filter").addEventListener("click", (event) => {
    
    // set all filters as inactive
    setAllFiltersInactive();
    // set current filter as active
    event.target.classList.add("active_filter");

    // show all tasksx`
    const all_tasks = document.querySelectorAll(".task_list .task");
    all_tasks.forEach(task_ele => {
        if(task_ele.querySelector("input.task_completion_selector:checked")){
            task_ele.style.display = "";
        }else {
            task_ele.style.display = "none";
        }
    });
});

/* EVENT LISTENERS END */