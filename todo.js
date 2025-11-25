class Task {
  constructor(name, status, type) {
    this.name = name;
    this.status = status;
    this.type = type;
  }

  getName() {
    return this.name.toString();
  }

  getType() {
    return this.type.toString();
  }

  getStatus() {
    return this.status;
  }

  getCheckBoxName() {
    return this.name.toString() + this.type.toString();
  }


  changeStatus(checkbox) {
    if (checkbox.checked === true) {
      this.status = false;
    } else {
      this.status = true;
    }
  }
}

const createBtn = document.getElementById("create"); 
const popUpBtn = document.getElementById("OpenPopUp");
const refreshBtn = document.getElementById("refresh");

popUpBtn.addEventListener("click", taskMenu);
createBtn.addEventListener("click", createTask);
refreshBtn.addEventListener("click", updateHTML);

let tasks = [];

function taskMenu() {
  let visibility = document.getElementById("popup");
  visibility.classList.remove("closed");
  visibility.classList.add("open");

}

function createTask() {
  let newName = document.getElementById("name");
  let newType = document.getElementById("taskType");

  let newClass = new Task(newName.value, true, newType.value);
  tasks.push(newClass);
  
  let visibility = document.getElementById("popup");
  visibility.classList.remove("open");
  visibility.classList.add("closed");

  updateHTML();
}

function updateHTML() {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let oldBox = document.getElementById(task.getCheckBoxName());
    if (oldBox !== null) {
      task.changeStatus(oldBox);
    }
  }

  tasks = tasks.filter(task => task.getStatus() === true);

  let main = document.querySelector("main");
  main.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {

    let task = tasks[i];

    let newDiv = document.createElement("div");
    newDiv.className = "task";

    let newTaskName = document.createElement("p");
    newTaskName.innerText = "Task: " + task.getName();

    let newTaskType = document.createElement("p");
    newTaskType.innerText = "Type: " + task.getType();

    let newTaskBox = document.createElement("input");
    newTaskBox.type = "checkbox";
    newTaskBox.id = task.getCheckBoxName();

    newTaskBox.checked = !task.getStatus();

    newTaskBox.addEventListener("change", () => {
      task.changeStatus(newTaskBox);
    });

    newDiv.appendChild(newTaskName);
    newDiv.appendChild(newTaskType);
    newDiv.appendChild(newTaskBox);

    main.appendChild(newDiv);
  }
};