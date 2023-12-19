const todoList = document.querySelector('.todo-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskCountElement = document.querySelector('.task-count');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateTaskList() {
  todoList.innerHTML = '';
  taskCountElement.textContent = `${tasks.filter(task => !task.completed).length} tasks remaining`;
  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');
    if (task.completed) {
      listItem.classList.add('completed');
    }
    listItem.textContent = task.text;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(task));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task));

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleCompletion(task));

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    buttons.appendChild(checkbox);
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);

    listItem.appendChild(buttons);
    todoList.appendChild(listItem);
  });
}

function addTask() {
  const newTaskText = newTaskInput.value.trim();
  if (newTaskText) {
    tasks.push({ text: newTaskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    newTaskInput.value = '';
    updateTaskList();
  }
}

function editTask(task) {
  const newText = prompt('Enter new text for the task:', task.text);
  if (newText) {
    task.text = newText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskList();
  }
}

function deleteTask(task) {
  const index = tasks.findIndex(item => item === task);
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  updateTaskList();
}

function toggleCompletion(task) {
  task.completed = !task.completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  updateTaskList();
}

addTaskButton.addEventListener('click', addTask);
updateTaskList();

