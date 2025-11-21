class Task {
  constructor(name, status, type) {
    this.name = name;
    this.status = status; // true = behold, false = slett
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

  // checked = slett (status=false)
  // unchecked = behold (status=true)
  changeStatus(checkbox) {
    this.status = !checkbox.checked;
  }
}

let tasks = [];

const createBtn = document.getElementById("create"); 
const popUpBtn = document.getElementById("OpenPopUp");
const refreshBtn = document.getElementById("refresh");

createBtn.addEventListener("click", createTask);
popUpBtn.addEventListener("click", taskMenu);
refreshBtn.addEventListener("click", updateHTML);

function createTask() {
  let newName = document.getElementById("name");
  let newType = document.getElementById("taskType");

  // Ny task skal beholdes (unchecked)
  const newClass = new Task(newName.value, true, newType.value);
  tasks.push(newClass);
  
  let visibility = document.getElementById("popup");
  visibility.classList.remove("open");
  visibility.classList.add("closed");

  updateHTML();
}

function updateHTML() {

  // 1. Oppdater status basert på EKSISTERENDE checkboxes
  tasks.forEach(task => {
    const oldBox = document.getElementById(task.getCheckBoxName());
    if (oldBox) {
      task.changeStatus(oldBox);
    }
  });

  // 2. Fjern tasks der status = false
  tasks = tasks.filter(task => task.getStatus() === true);

  // 3. Tøm HTML
  const main = document.querySelector("main");
  main.innerHTML = "";

  // 4. Tegn alle tasks på nytt
  tasks.forEach(task => {

    const newDiv = document.createElement("div");
    newDiv.className = "task";

    const newTaskName = document.createElement("p");
    newTaskName.innerText = task.getName();

    const newTaskType = document.createElement("p");
    newTaskType.innerText = task.getType();

    const newTaskBox = document.createElement("input");
    newTaskBox.type = "checkbox";
    newTaskBox.id = task.getCheckBoxName();

    // 👇 Viktig:
    // status=true → behold → unchecked
    // status=false → slett → checked
    newTaskBox.checked = !task.getStatus();

    // Oppdater status når checkboxen trykkes
    newTaskBox.addEventListener("change", () => {
      task.changeStatus(newTaskBox);
    });

    newDiv.appendChild(newTaskName);
    newDiv.appendChild(newTaskType);
    newDiv.appendChild(newTaskBox);

    main.appendChild(newDiv);
  });
}

function taskMenu() {
  let visibility = document.getElementById("popup");
  visibility.classList.remove("closed");
  visibility.classList.add("open");

  // let body = document.querySelector("Body")
  // body.style.setProperty("background", "rgba(0, 0, 0, 0.2)")
}
