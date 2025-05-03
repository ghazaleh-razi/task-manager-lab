const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task;
    li.appendChild(span);

    const buttonContainer = document.createElement('div');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('action-btn', 'edit-btn');
    editBtn.onclick = () => {
      const newTask = prompt('Edit your task:', task);
      if (newTask !== null && newTask.trim() !== '') {
        tasks[index] = newTask.trim();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('action-btn', 'delete-btn');
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    li.appendChild(buttonContainer);

    taskList.appendChild(li);
  });

  taskCounter.textContent = `You have ${tasks.length} task${tasks.length !== 1 ? 's' : ''}`;
}

addTaskBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (task) {
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
  }
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTaskBtn.click();
  }
});

document.getElementById("showCountBtn").addEventListener("click", showTaskSummary);

function showTaskSummary() {
  const taskList = document.getElementById("taskList");
  const tasks = taskList.getElementsByTagName("li");
  const count = tasks.length;

  alert(`You currently have ${count} task${count !== 1 ? "s" : ""}.`);
}

renderTasks();
