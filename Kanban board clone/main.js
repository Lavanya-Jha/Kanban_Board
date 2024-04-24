function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

function addTask(columnId) {
    const column = document.getElementById(columnId).getElementsByClassName('tasks')[0];
    const taskName = prompt("Enter the task name:");
    const urgencyLevel = prompt("Enter the urgency level (urgent, high, medium, low):");
    if (taskName && urgencyLevel) {
        const task = document.createElement('div');
        task.className = 'card ' + urgencyLevel;
        task.setAttribute("draggable", "true");
        task.setAttribute("id", "task" + Math.random());
        task.setAttribute("ondragstart", "drag(event)");
        task.setAttribute("data-urgency", urgencyLevel); // Store the urgency level

        const taskText = document.createElement('div');
        taskText.textContent = taskName;
        task.appendChild(taskText);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            const newTaskName = prompt("Edit the task:", taskText.textContent);
            const newUrgencyLevel = prompt("Edit the urgency level (urgent, high, medium, low):", task.getAttribute("data-urgency"));
            if (newTaskName) {
                taskText.textContent = newTaskName;
            }
            if (newUrgencyLevel) {
                task.className = 'card ' + newUrgencyLevel;
                task.setAttribute("data-urgency", newUrgencyLevel);
            }
        };
        task.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            if (confirm("Are you sure you want to delete this task?")) {
                task.parentNode.removeChild(task);
            }
        };
        task.appendChild(deleteButton);

        column.appendChild(task);
    }
}

function toggleColumn(columnId) {
    const column = document.getElementById(columnId);
    column.classList.toggle('collapsed');
}