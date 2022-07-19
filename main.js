const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0;
const handleAddTask = () => {
    const inputIsValid = validateInput();

    if(!inputIsValid) {
       return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    const taskContant = document.createElement('p')
    taskContant.innerText = inputElement.value;


    const doneItem = document.createElement('i');
    doneItem.classList.add("fa-solid");
    doneItem.classList.add("fa-check");
    doneItem.classList.add("alinhar");

    doneItem.addEventListener('click', () => handleClick(taskContant))

    const deleteItem = document.createElement('i');
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash-can");
    deleteItem.classList.add("alinhar1");

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContant))

    taskItemContainer.appendChild(taskContant);
    taskItemContainer.appendChild(doneItem);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage()

};


const handleClick = (taskContant) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContant);
        if(currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle("completed");
        }

    } 
    updateLocalStorage()
};

const handleDeleteClick = (taskItemContainer, taskContant) => {
    const tasks = tasksContainer.childNodes;
    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContant)
        if(currentTaskIsBeingClicked){
            taskItemContainer.remove();
        }
    }
    updateLocalStorage()
};

const handleInputChange = () => {
    const inputIsValid = validateInput();
    if (inputIsValid) {
        return inputElement.classList.remove("error")
    }
};

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;
    const localStorageTasks = [... tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed');
        
        return { description: content.innerText, isCompleted };
    });

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if(!tasksFromLocalStorage) return;

    for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    const taskContant = document.createElement('p')
    taskContant.innerText = task.description;

    if (task.isCompleted) {
        taskContant.classList.add("completed")
    }


    const doneItem = document.createElement('i');
    doneItem.classList.add("fa-solid");
    doneItem.classList.add("fa-check");
    doneItem.classList.add("alinhar");

    doneItem.addEventListener('click', () => handleClick(taskContant))

    const deleteItem = document.createElement('i');
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash-can");
    deleteItem.classList.add("alinhar1");

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContant))

    taskItemContainer.appendChild(taskContant);
    taskItemContainer.appendChild(doneItem);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);
    }

}

addTaskButton.addEventListener("click", () => handleAddTask ())

inputElement.addEventListener('change', () => handleInputChange())