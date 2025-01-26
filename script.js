document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => li.firstChild.textContent); // Extract task text
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask(taskText, save = true) {
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        const listItem = document.createElement('li');
        const taskSpan = document.createElement('span'); // Span to hold task text
        taskSpan.textContent = taskText;
        listItem.appendChild(taskSpan);

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        removeButton.addEventListener('click', function() {
            listItem.remove();
            saveTasks(); // Save after removal
        });

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        taskInput.value = "";

        if (save) {
            saveTasks(); // Save after adding
        }
    }

    addButton.addEventListener('click', () => addTask(taskInput.value.trim()));

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });

    loadTasks(); // Load tasks on DOMContentLoaded
});
