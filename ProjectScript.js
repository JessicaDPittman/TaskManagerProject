const taskForm = document.getElementById("taskForm");
const taskManager = document.getElementById("taskmanager");

let tasks = [];
let taskId = 1;

taskForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("taskName").value.trim();
  const priority = document.getElementById("priority").value;
  const isImportant = document.getElementById("important").checked;
  const date = new Date().toLocaleDateString();

  if (name === "") return; // prevent empty task

  const task = {
    id: taskId++,
    name,
    priority,
    isImportant,
    isCompleted: false,
    date
  };

  tasks.push(task);
  updateDisplay();
  taskForm.reset();
});

function updateDisplay() {
  taskManager.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";
    if (task.isImportant) div.classList.add("important");
    if (task.isCompleted) div.classList.add("completed");

    div.innerHTML = `
  <div><strong>${task.name}</strong></div>
  <div>Priority: ${task.priority}</div>
  <div>Important: ${task.isImportant ? 'Yes' : 'No'}</div>
  <div>Date: ${task.date}</div>
  <div>
    <label><input type="checkbox" ${task.isCompleted ? "checked" : ""} onchange="toggleDone(${task.id})"> Done</label>
  </div>
  <div>
    <button class="add-button" onclick="deleteTask(${task.id})">Delete</button>
  </div>
`;


    taskManager.appendChild(div);
  });

  console.log(JSON.stringify(tasks));
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  updateDisplay();
}

function toggleDone(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.isCompleted = !task.isCompleted;
    updateDisplay();
  }
}
