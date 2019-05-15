// console.log(boards);


const createCards = ( taskList ) => {
    const boardContainer = document.querySelector('#boardContainer');

    taskList.forEach( list => {
        let taskListCard = document.createElement('div');
        taskListCard.className = 'task-list-card';

        let taskListTitle = document.createElement('div');
        taskListTitle.className = 'task-list-title';
        taskListTitle.innerHTML = list.listTitle;

        taskListCard.appendChild(taskListTitle);

        createTask(list.tasks, taskListCard);

        boardContainer.appendChild(taskListCard);
    });

}

const createTask = (tasks, taskListCard) => {
    tasks.forEach(task => {

        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.id = task.id;
        taskCard.setAttribute('draggable', 'true');


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
        taskFooter.className = 'task-footer';

        const taskComment = document.createElement('div');
        taskComment.className = 'task-comment';

        const commentIcon = document.createElement('i');
        commentIcon.classList.add('far', 'fa-comment-dots');

        let commentCount = document.createElement('span');
        commentCount.innerHTML = task.commentCount;

        taskComment.appendChild(commentIcon);
        taskComment.appendChild(commentCount);

        taskFooter.appendChild(taskComment);

        // Task Link
        const taskLink = document.createElement('div');
        taskLink.className = 'task-link';

        const linkIcon = document.createElement('i');
        linkIcon.classList.add('fas', 'fa-link');

        let linkCount = document.createElement('span');
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

    })

    // Add task button
    const taskAddDiv = document.createElement('div');
    taskAddDiv.className = 'task-add';
    taskAddText = document.createElement('span');
    taskAddText.innerHTML = 'Add Task';
    taskAddDiv.appendChild(taskAddText);

    taskAddIcon = document.createElement('i');
    taskAddIcon.classList.add('fas', 'fa-plus');
    taskAddDiv.appendChild(taskAddIcon);

    taskListCard.appendChild(taskAddDiv);
}


const dragStart = (ev) => {
    console.log('Start');

    ev.dataTransfer.setData('Content', ev.target.id);

    ev.target.style.opacity = "0.4";

}
const dragEnd = (ev) => {
    console.log('End');

    // ev.dataTransfer.setData('Content', ev.target.id);

    ev.target.style.opacity = "1";

    // TODO: Remove the task from old board

}

const dragOver = (ev) => {
    ev.preventDefault();
    console.log('Allow drop: ' + ev.target.id);
}

const dragEnter = (ev) => {
    ev.preventDefault();
    console.log('Drag Enter: ' + ev.target.id);
}
const dragLeave = (ev) => {
    ev.preventDefault();
    console.log('Drag Leave: ' + ev.target.id);
}

const dragDrop = (ev) => {
    ev.preventDefault();

    const data = ev.dataTransfer.getData('Content');

    console.log(data);

    ev.target.appendChild(document.getElementById(data));

    // TODO: Add the task to new board
}




const main = (boardsData) => {

    createCards(boardsData);

    // boardContainer.appendChild(taskListHtml);

    const taskListCards = document.querySelectorAll('.task-list-card');
    taskListCards.forEach(taskListCard => {
        taskListCard.addEventListener('dragover', (ev) => dragOver(ev));
        taskListCard.addEventListener('dragenter', (ev) => dragEnter(ev));
        taskListCard.addEventListener('dragleave', (ev) => dragLeave(ev));
        taskListCard.addEventListener('drop', (ev) => dragDrop(ev));
    });

    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(taskCard => {
        taskCard.addEventListener('dragstart', (ev) => dragStart(ev));
        taskCard.addEventListener('dragend', (ev) => dragEnd(ev));
        // taskListCard.addEventListener('dragover', (ev) => allowDrop(ev));
        // taskCard.addEventListener('drop', (ev) => dragDrop(ev));

    })


}
main(boards);



