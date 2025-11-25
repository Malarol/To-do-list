class Task {
  constructor(name, status, type, importancy) {
    this.name = name;
    this.status = status;
    this.type = type;
    this.importancy = importancy;
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

  getImportancy() {
    return this.importancy;
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
const switchModeBtn = document.getElementById("switchMode");
const refreshBtn = document.getElementById("refresh");

popUpBtn.addEventListener("click", taskMenu);
createBtn.addEventListener("click", createTask);
refreshBtn.addEventListener("click", updateHTML);
switchModeBtn.addEventListener("click", switchMode);

let tasks = [];

let mode = true;

function taskMenu() {
  let visibility = document.getElementById("popup");
  visibility.classList.remove("closed");
  visibility.classList.add("open");

  document.querySelector("header").classList.add("blur");
  document.querySelector("main").classList.add("blur");
  document.querySelector("footer").classList.add("blur");

  document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
          document.querySelector("header").classList.remove("blur");
          document.querySelector("main").classList.remove("blur");
          document.querySelector("footer").classList.remove("blur");

          visibility.classList.remove("open");
          visibility.classList.add("closed");
      }
  });

}

function switchMode() {
  if (mode === true) {
    mode = false;
    switchModeBtn.innerText = "Mode: Hectic";
  }
  else if (mode === false) {
    mode = true;
    switchModeBtn.innerText = "Mode: Standard";
  }
  updateHTML();
}

function createTask() {
  let newName = document.getElementById("name");
  let newType = document.getElementById("taskType");
  let important = document.getElementById("important");

  let newClass = new Task(newName.value, true, newType.value, important.value);
  tasks.push(newClass);
  
  let visibility = document.getElementById("popup");
  visibility.classList.remove("open");
  visibility.classList.add("closed");

  document.querySelector("header").classList.remove("blur");
  document.querySelector("main").classList.remove("blur");
  document.querySelector("footer").classList.remove("blur");

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

  hecticTasks = tasks.filter(task => task.getImportancy() >= 5);
  
  let useTasks; 

  if (mode === true) {
    useTasks = tasks;
  }
  else if (mode === false) {
    useTasks = hecticTasks;
  }

  let main = document.querySelector("main");
  main.innerHTML = "";

  for (let i = 0; i < useTasks.length; i++) {

    let task = useTasks[i];

    let newDiv = document.createElement("div");
    newDiv.className = "task";

    let newTaskName = document.createElement("p");
    newTaskName.innerText = "Task: " + task.getName();

    let newTaskType = document.createElement("p");
    newTaskType.innerText = "Type: " + task.getType();

    let newTaskImportancy = document.createElement("p");
    newTaskImportancy.innerText = "Importancy:" + task.getImportancy(); 

    let newTaskBox = document.createElement("input");
    newTaskBox.type = "checkbox";
    newTaskBox.id = task.getCheckBoxName();

    newTaskBox.checked = !task.getStatus();

    newTaskBox.addEventListener("change", () => {
      task.changeStatus(newTaskBox);
    });

    newDiv.appendChild(newTaskName);
    newDiv.appendChild(newTaskType);
    newDiv.appendChild(newTaskImportancy);
    newDiv.appendChild(newTaskBox);

    main.appendChild(newDiv);
  }
};