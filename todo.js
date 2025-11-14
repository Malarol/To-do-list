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

  getCheckBoxName() {
    return this.name.toString() + this.type.toString();
  }

  changeStatus(checkbox) {
    if (checkbox.checked) {
      this.status = true;
    } 
    else {
      this.status = false;  
    }
  }
}

let tasks = [];

let createBtn = document.getElementById("create");
let popUpBtn = document.getElementById("OpenPopUp");

createBtn.addEventListener("click", createTask);
popUpBtn.addEventListener("click", taskMenu);

function createTask() {
  let newName = document.getElementById("name");
  let newType = document.getElementById("taskType");

  const newClass = new Task(newName.value, true, newType.value);
  tasks.push(newClass);
  
  let visibility = document.getElementById("popup");
  visibility.classList.remove("open");
  visibility.classList.add("closed");

  updateHTML();
}

function updateHTML() {
  document.querySelector("main").innerText = ""
  for (let i = 0; i < tasks.length; i++) {

    const selector = tasks[i];

    if (selector.status == false){
      tasks.splice(i, 1)
    }

    const newDiv = document.createElement("div");
    newDiv.className = "task";

    const newTaskName = document.createElement("p");
    newTaskName.innerText = selector.getName();

    const newTaskType = document.createElement("p");
    newTaskType.innerText = selector.getType();

    const newTaskBox = document.createElement("input");
    newTaskBox.type = "checkbox";
    newTaskBox.id = selector.getCheckBoxName();

    newDiv.appendChild(newTaskName);
    newDiv.appendChild(newTaskType);
    newDiv.appendChild(newTaskBox);

    document.querySelector("main").appendChild(newDiv);
    console.log(tasks);
  }
}

function taskMenu() {
  let visibility = document.getElementById("popup")
  visibility.classList.remove("closed")
  visibility.classList.add("open")
}

function refresh () {


  }
