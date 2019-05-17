newListWrapper/*  boards is a variable having all data
 *  console.log(boards);
 *
 *  All data is coming from boards variable and
 *  HTML UI is being created dynamicaly
 *
 */

// Function to create List Cards UI
const createCards = ( taskList ) => {
    const boardContainer = document.querySelector('#boardContainer');

    taskList.forEach( list => {

        const newListWrapper = document.getElementById('newListWrapper');
        const taskListCard = createTaskListCard(list);

        boardContainer.insertBefore(taskListCard, newListWrapper);
    });

}

const createTaskListCard = (list, boardContainer) => {
    const taskListWrapper = document.createElement('div');
    taskListWrapper.classList.add('task-list-wrapper');
    taskListWrapper.id = list.id;
    taskListWrapper.addEventListener('dragenter', (ev) => dragEnter(ev));
    taskListWrapper.addEventListener('dragover', (ev) => dragOver(ev));
    taskListWrapper.addEventListener('dragleave', (ev) => dragLeave(ev));
    taskListWrapper.addEventListener('drop', (ev) => dragDrop(ev));

    const taskListCard = document.createElement('div');
    taskListCard.className = 'task-list-card';

    const taskListTitle = document.createElement('div');
    taskListTitle.className = 'task-list-title';
    taskListTitle.innerHTML = list.listTitle;
    taskListCard.appendChild(taskListTitle);

    const taskList = document.createElement('div');
    taskList.className = list.id;

    createTaskList(list.tasks, taskList);
    taskListCard.appendChild(taskList);

    // Add task button
    createTaskAddBtn(taskListCard);

    // Add task form
    createTaskAddForm(taskListCard);

    taskListWrapper.appendChild(taskListCard);

    // Add Empty card to drop something
    const emptyCard = document.createElement('div');
    emptyCard.className = 'empty-task-card';
    emptyCard.innerHTML = 'Drop Here';

    taskListWrapper.appendChild(emptyCard);

    return taskListWrapper;
}

const createTaskList = (tasks, taskListCard) => {
    tasks.forEach(task => {
        createTask(task, taskListCard);
    });
}

const createTask = (task, taskListCard) => {
    const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.id = task.id;
        taskCard.setAttribute('draggable', 'true');
        taskCard.addEventListener('dragstart', (ev) => dragStart(ev));
        taskCard.addEventListener('dragend', (ev) => dragEnd(ev));

        const taskDeleteBtn = document.createElement('button');
        taskDeleteBtn.title = 'Delete this task';
        taskDeleteBtn.classList.add('task-delete-btn', 'fas', 'fa-trash');

        taskDeleteBtn.addEventListener('click', ev => removeTaskFromList(ev) );
        taskCard.appendChild(taskDeleteBtn);

        const taskPriority = document.createElement('div');
        taskPriority.className = 'task-priority';
        taskPriority.classList.add(task.priority === 'high' ? 'high-priority' :
            task.priority === 'medium' ? 'med-priority' : 'low-priority');
        taskPriority.innerHTML = task.priority;
        taskCard.appendChild(taskPriority);

        const taskDescription = document.createElement('div');
        taskDescription.className = 'task-description';
        taskDescription.innerHTML =  task.description;
        taskCard.appendChild(taskDescription);

        const taskFooter = document.createElement('div');
        taskFooter.classList.add('task-footer', 'hidden');

        const taskComment = document.createElement('div');
        taskComment.className = 'task-comment';

        const commentIcon = document.createElement('i');
        commentIcon.classList.add('far', 'fa-comment-dots');

        const commentCount = document.createElement('span');
        commentCount.innerHTML = task.commentCount;

        taskComment.appendChild(commentIcon);
        taskComment.appendChild(commentCount);

        taskFooter.appendChild(taskComment);

        // Task Link
        const taskLink = document.createElement('div');
        taskLink.className = 'task-link';

        const linkIcon = document.createElement('i');
        linkIcon.classList.add('fas', 'fa-link');

        const linkCount = document.createElement('span');
        linkCount.innerHTML = task.linkCount;

        taskLink.appendChild(linkIcon);
        taskLink.appendChild(linkCount);

        taskFooter.appendChild(taskLink);

        // Task People
        const taskPeople = document.createElement('div');
        taskPeople.className = 'task-people';

        const addIconDiv = document.createElement('div');
        const addIcon = document.createElement('i');
        addIcon.classList.add('fas', 'fa-plus');
        addIconDiv.appendChild(addIcon);

        taskPeople.appendChild(addIconDiv);

        const peopleIconDiv = document.createElement('div');
        const peopleIcon = document.createElement('i');
        peopleIcon.classList.add('fas', 'fa-user');
        peopleIconDiv.appendChild(peopleIcon);

        taskPeople.appendChild(peopleIconDiv);

        taskFooter.appendChild(taskPeople);

        taskCard.appendChild(taskFooter);

        taskListCard.appendChild(taskCard);
}

const createTaskAddBtn = (taskListCard) => {
    const taskAddDiv = document.createElement('button');
    taskAddDiv.addEventListener('click', ev => showTaskAddForm(ev));
    taskAddDiv.className = 'task-add';
    taskAddDiv.innerHTML = 'Add Task';

    taskAddText = document.createElement('span');
    taskAddText.innerHTML = 'Add Task';
    // taskAddDiv.appendChild(taskAddText);

    taskAddIcon = document.createElement('i');
    taskAddIcon.classList.add('fas', 'fa-plus');
    // taskAddDiv.appendChild(taskAddIcon);

    taskListCard.appendChild(taskAddDiv);
}

const createTaskAddForm = (taskListCard) => {
    // Add Task form
    const taskAddForm = document.createElement('form');
    taskAddForm.classList.add('task-add-form', 'hidden');
    taskAddForm.addEventListener('submit', ev => handleTaskSave(ev));
    taskAddForm.innerHTML = `
        <textarea name="description" type="textarea" placeholder="Enter description of task" autofocus required/></textarea>
        <select name="priority">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <span>
            <button type="submit" class="btn-success"> Save </button>
            <button class="btn-danger" > Discard </button>
        </span>
    `;

    taskListCard.appendChild(taskAddForm);
}

// Function to handle add task form open/close
showTaskAddForm = (ev) => {
    console.log(ev.target.nextSibling);
    ev.target.nextSibling.classList.remove('hidden');
    ev.target.classList.add('hidden');
}

// Handle new list save on Submit
const handleListSave = (ev) => {
    ev.preventDefault();

    const elements = ev.target.elements;
    let list = {};
    for (let i = 0 ; i < elements.length ; i++) {
        const item = elements.item(i);
        list[item.name] = item.value;
    }

    // Generate unique an ID for list
    const listId = Math.random().toString(36).substring(2)
        + (new Date()).getTime().toString(36);

    list.id = listId;
    list.tasks = [];

    // Add task to list in HTML
    const boardContainer = document.getElementById('boardContainer');
    const newListWrapper = document.getElementById('newListWrapper');
    const taskListCard = createTaskListCard(list);
    boardContainer.insertBefore(taskListCard, newListWrapper);

    // Add List data to Boards in JSON data
    addListToBoard(list);

    // Reset the form
    ev.target.reset();

    ev.target.classList.add('hidden');
    document.getElementById('createListButton').classList.remove('hidden');
}

// Handle new task form SAVE submit
const handleTaskSave = (ev) => {
    ev.preventDefault();

    const elements = ev.target.elements;
    let task = {};
    for (let i = 0 ; i < elements.length ; i++) {
        const item = elements.item(i);
        task[item.name] = item.value;
    }

    // Generate unique an ID for task
    const taskId = Math.random().toString(36).substring(2)
        + (new Date()).getTime().toString(36);

    task.id = taskId;
    task.commentCount = 3;
    task.linkCount = 2;

    // Get Task List ID
    const taskListId = ev.target.parentNode.parentNode.getAttribute('id');

    // Add task to list in HTML
    const taskListCard = document.querySelector(`.${taskListId}`);
    createTask(task, taskListCard);

    // Add task to list in JSON data
    addTaskToList(taskListId, task);

    // Reset the form
    ev.target.reset();
    ev.target.classList.add('hidden');
    ev.target.previousSibling.classList.remove('hidden');

}

// Function to add a task to a Task List in JSON Data
const addTaskToList = (listId, task) => {
    let boardData = getLocalStoreData();

    boardData = boardData.map(taskList => {
        if (taskList.id === listId) {
            taskList.tasks.push(task);
        }
        return taskList;
    });

    updateLocalStoreData(boardData);
}

// Function to remove a task from a Task List in JSON Data
const removeTaskFromList = (ev) => {
    let boardData = getLocalStoreData();

    const taskCard = ev.target.parentNode;
    const taskListCard = taskCard.parentNode;

    taskListCard.removeChild(taskCard);

    taskListId = taskListCard.className;
    taskId = taskCard.id;

    boardData = boardData.map(taskList => {
        if (taskList.id === taskListId) {
            taskList.tasks = taskList.tasks.filter(task => task.id !== taskId);
        }
        return taskList;
    });

    updateLocalStoreData(boardData);
}

// Function to add a List data to Boards JSON Data
const addListToBoard = (newList) => {
    let boardData = getLocalStoreData();
    boardData.push(newList);
    updateLocalStoreData(boardData);
}

// Function to remove a List data to Boards JSON Data
const removeListFromBoard = (listId) => {
    let boardData = getLocalStoreData();
    boardData = boardData.filter(list => list !== listId);
    updateLocalStoreData(boardData);
}


/****************************************************
 *  Handle all drag drop function
 */

const dragStart = (ev) => {
    // console.log('Start');
    ev.dataTransfer.setData('Content', ev.target.id);
    ev.dataTransfer.effectAllowed = 'move';
    ev.target.style.opacity = "0.4";
}

const dragEnd = (ev) => {
    // console.log('End');
    ev.target.style.opacity = "1";
}

const dragOver = (ev) => {
    ev.preventDefault();
    ev.target.classList.add('show-empty');
    ev.dataTransfer.dropEffect = 'move';
    // console.log('Allow drop: ' + ev.target.id);
}

const dragEnter = (ev) => {
    ev.preventDefault();
    ev.target.classList.add('show-empty');
    // console.log('Drag Enter: ' + ev.target.id);
}
const dragLeave = (ev) => {
    ev.preventDefault();
    ev.target.classList.remove('show-empty');
    // console.log('Drag Leave: ' + ev.target.id);
}

const dragDrop = (ev) => {
    ev.preventDefault();
    ev.target.classList.remove('show-empty');

    // Restrict Drop to only List Wrapper
    if (ev.target.className === 'task-list-wrapper') {
        const data = ev.dataTransfer.getData('Content');
        const taskList = document.querySelector(`.${ev.target.id}`);
        taskList.appendChild(document.getElementById(data));

        // TODO: Move Task in JSON data

    }
}


/***********************************************
 *    Entry point Function definition
 */
const getLocalStoreData = () => {
    if (typeof(Storage) !== "undefined") {
        return JSON.parse(localStorage.getItem('trelloCloneBoard'));
    } else {
        return boards;
    }
}

const updateLocalStoreData = (boardData) => {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('trelloCloneBoard', JSON.stringify(boardData));
    } else {
        boards = boardData;
    }
}


const main = () => {

    let boardData = boards;

    // Check if data is available in localStorage
    if (typeof(Storage) !== "undefined") {
        console.log('localStorage supported');

        if ('trelloCloneBoard' in localStorage) {
            let localStoreData = getLocalStoreData();
            boardData = localStoreData.length > 0 ? localStoreData : boardData;
        } else {
            localStorage.setItem('trelloCloneBoard', JSON.stringify(boardData));
        }
    } else {
        // Sorry! No Web Storage support..
        console.log('No Support of localstore!');
    }

    // Create HTML UI from data
    createCards(boardData);

    // Event Listeners for newList button and Form
    const createListButton = document.getElementById('createListButton');
    const createListForm = document.getElementById('createListForm');
    createListButton.addEventListener('click', ev => {
        createListForm.classList.remove('hidden');
        createListButton.classList.add('hidden');
    });
    createListForm.addEventListener('submit', ev => handleListSave(ev));

}

// Call the Entry function
main();
