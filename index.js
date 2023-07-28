/** @format */

const tasks = [];

function add0toNumber(num) {
  let numStr = "";

  if (num >= 10) {
    numStr = `${num}`;
  } else {
    numStr = `0${num}`;
  }

  return numStr;
}

function getAndPrintTime() {
  const date = new Date();

  const time = `${add0toNumber(date.getHours())}:${add0toNumber(
    date.getMinutes()
  )}:${add0toNumber(date.getSeconds())}`;

  document.getElementById("time").innerHTML = time;
}

// getAndPrintTime();

setInterval(() => {
  getAndPrintTime();
}, 1000);

function handlePrintTask(item, index) {
  const container = document.createElement("div");

  const div = document.createElement("div");
  div.setAttribute("class", "row mt-2 mb-2 list");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");

  const btn = document.createElement("button");
  btn.setAttribute("class", "btn btn-sm btn-danger");

  btn.innerHTML = "Del";
  btn.setAttribute("onclick", `handleRemoveTask(${index})`);

  const p = document.createElement("p");
  p.setAttribute("class", "col list-item");
  p.innerHTML = item.content;

  const createdAt = document.createElement("p");
  createdAt.innerHTML = new Date(item.createdAt).toISOString();

  div.appendChild(checkbox);
  div.appendChild(p);
  div.appendChild(btn);

  container.appendChild(div);
  container.appendChild(createdAt);

  document.getElementById("tasks-container").appendChild(container);
}

function handleAddNewTask() {
  const newTask = document.getElementById("inp-task").value;

  const task = {
    content: newTask,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isCompleted: false,
    createdBy: "my",
  };

  tasks.push(task);
  document.getElementById("inp-task").value = "";
}

function handleShowTasks() {
  tasks.forEach((item, index) => handlePrintTask(item, index));
}
console.log(object);

/*
1. Lưu danh sách nhiệm vụ vào localstorage
2. Mỗi lần thêm nhiệm vụ mới, kiểm tra xem có danh sách trong local chưa, nếu có thì thêm vào và lưu lại,
 nếu chưa có thì tạo mới và lưu lại 
3. Hiển thị danh sách nhiệm vụ từ local
4. Khi người dùng bấm vào checkbox thì chuyển nội dung nhiệm vụ thành màu xám, gạch ngang nội dung
5. Xoá nhiệm vụ 
Chỉ nhiệm vụ đã hoàn thành mới được xoá
Nếu chưa hoàn thành, hiển thị thông báo cho người dùng
*/

function saveTasksToLocalStorage() {
  const tasksJson = JSON.stringify(tasks);

  localStorage.setItem("tasks", tasksJson);
}

function loadTasksFromLocalStorage() {
  const tasksJson = localStorage.getItem("tasks");

  if (tasksJson) {
    tasks = JSON.parse(tasksJson);
  }
}

loadTasksFromLocalStorage();

function handleAddNewTask() {
  tasks.push(task);
  saveTasksToLocalStorage();
}

function handleRemoveTask(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage();
}

let taskList = [];

function addNewTask(newTask) {
  const taskExists = taskList.some((task) => task === newTask);

  if (!taskExists) {
    taskList.push(newTask);

    localStorage.setItem("taskList", JSON.stringify(taskList));
  }
}

const newTask = "Nhiệm vụ mới 1";
addNewTask(newTask);

function handlePrintTasks() {
  const tasksContainer = document.getElementById("tasks-container");

  tasksContainer.innerHTML = "";

  tasks.forEach((item, index) => handlePrintTask(item, index));
}

function handlePrintTask(item, index) {}

handlePrintTasks();

function handlePrintTask(item, index) {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");

  checkbox.addEventListener("change", function () {
    const listItem = div.querySelector("p");
    if (this.checked) {
      listItem.style.textDecoration = "line-through";
      listItem.style.color = "gray";
    } else {
      listItem.style.textDecoration = "none";
      listItem.style.color = "black";
    }
  });
}

handlePrintTasks();

function handleRemoveTask(index) {
  const item = tasks[index];
  const isCompleted = item.isCompleted;

  if (isCompleted) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();

    handlePrintTasks();
  } else {
    alert("Bạn chỉ có thể xoá những nhiệm vụ đã hoàn thành!");
  }
}
