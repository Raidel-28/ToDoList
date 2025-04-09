let lastTaskId = 0;

class Task {
    id;
    label;
    dateAdded;
    dateDone = null;
    isDone = false;
    constructor(label) {
        this.id = lastTaskId;
        lastTaskId++;
        this.label = label;
        this.dateAdded = new Date();
        console.log(this.dateAdded);
    }
    createTaskElement() {
        const taskItem = document.createElement("li");
        taskItem.className = this.isDone ? "task done" : "task"
        const parsedDate = `${this.dateAdded.getFullYear()}/${this.dateAdded.getMonth()}/${this.dateAdded.getDate()} ${this.dateAdded.getHours()}:${this.dateAdded.getMinutes()}`
        taskItem.innerHTML = `<div>
            <div class="date">
                <span class="date-add">${parsedDate}</span>
                <span class="date-done"></span>
            </div>
            <span class="task-name"></span>
        </div>
        <div>
            <button class="check">finie</button>
            <button class="del">supprimer</button>
        </div>`;
        taskItem.querySelector(".task-name").innerText = this.label;
        taskItem.querySelector(".del").addEventListener("click", () => {
            taskList.removeTask(this.id);
        })
        taskItem.querySelector(".check").addEventListener("click", () => {
            this.setCompletion(!this.isDone)
            taskList.refresh()
        })
        return taskItem;
    }
    setCompletion(isTaskDone) {
        this.isDone = isTaskDone
    }
}

const inputNewTaskLabel = document.getElementById("new-taskfield");
const buttonAddTask = document.getElementById("add-task");

const taskList = {
    domElement: document.getElementById("task-list"),
    tasks: [],
    addTask(task) {
        this.tasks.push(task);
        this.refresh()
    },
    removeTask(taskIdToRemove) {
        this.tasks = this.tasks.filter(task => task.id !== taskIdToRemove)
        this.refresh()
    },
    clearList() {
        this.domElement.innerHTML = ""
    },
    render() {
        this.tasks.forEach(task => {
            const newTaskToDisplay = task.createTaskElement()
            this.domElement.appendChild(newTaskToDisplay)
        });
    },
    refresh() {
        this.clearList();
        this.render();
    }
}

buttonAddTask.addEventListener("click", () => {
    const newTaskLabel = inputNewTaskLabel.value
    const newTask = new Task(newTaskLabel)
    taskList.addTask(newTask)
})