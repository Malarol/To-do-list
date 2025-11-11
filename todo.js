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
    }

    let tasks = [];

    document.getElementById("create").addEventListener("click", createTask);

    function createTask() {
      const newName = document.getElementById("name").value;
      const newType = document.getElementById("taskType").value;

      const newClass = new Task(newName, true, newType);
      tasks.push(newClass);

      const newDiv = document.createElement("div");
      newDiv.className = "task";

      const newTaskName = document.createElement("p");
      newTaskName.innerText = newClass.getName();

      const newTaskType = document.createElement("p");
      newTaskType.innerText = newClass.getType();

      const newTaskBox = document.createElement("input");
      newTaskBox.type = "checkbox";
      newTaskBox.id = newClass.getCheckBoxName();

      newDiv.appendChild(newTaskName);
      newDiv.appendChild(newTaskType);
      newDiv.appendChild(newTaskBox);

      document.getElementById("main").appendChild(newDiv);
    }