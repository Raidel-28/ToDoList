let lastTaskId = 0;

const formatDate = (date) => {
    return `${date.getFullYear()}/${formatDatePart(date.getMonth())}/${formatDatePart(date.getDate())} ${formatDatePart(date.getHours())}:${formatDatePart(date.getMinutes())}`
}
const formatDatePart = (datePart) => {
    if (!datePart || datePart === 0) {
        return "00";
    }
    if (datePart.toString().length < 2) {
        return `0${datePart.toString()}`
    }
    return datePart.toString()
}

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
        taskItem.innerHTML = `<div>
            <div class="date">
                <span class="date-add">${formatDate(this.dateAdded)}</span>
            </div>
            <span class="task-name"></span>
        </div>
        <div>
            <button class="check">Finie</button>
            <button class="del">Supprimer</button>
        </div>`;
        taskItem.querySelector(".task-name").innerText = this.label;
        taskItem.querySelector(".del").addEventListener("click", () => {
            const mustDelete = confirm("Voulez-vous vraiment supprimer cette tâche")
            if (mustDelete) {
                taskList.removeTask(this.id);
            }
        })
        if (this.isDone) {
            const dateDoneElement = document.createElement("span");
            dateDoneElement.className = "date-done";
            dateDoneElement.innerText = ` \u2794 ${formatDate(this.dateAdded)}`;
            taskItem.querySelector(".date").appendChild(dateDoneElement);
        }
        taskItem.querySelector(".check").addEventListener("click", () => {
            this.setCompletion(!this.isDone)
            taskList.refresh()
        })
        return taskItem;
    }
    setCompletion(isTaskDone) {
        this.isDone = isTaskDone
        if (isTaskDone) {
            this.dateDone = new Date()
        } else {
            this.dateDone = null
        }
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
        this.sortByCompletionState();
        this.clearList();
        this.render();
    },
    getAllTasklabels() {
        return this.tasks.map((task) => task.label)
    },
    /**
     * will sort with uncompleted task first if given null or true and the opposite if given false
     * @param {boolean} notCompletedFirst if true sort with uncompleted first (default behavior)
     */
    sortByCompletionState(notCompletedFirst = true) {
        if (notCompletedFirst) {
            this.tasks.sort((a, b) => {
                if (a.isDone !== b.isDone) {
                    return a.isDone - b.isDone
                }
                return a.dateAdded - b.dateAdded
            })
        } else {
            this.tasks.sort((a, b) => {
                if (a.isDone !== b.isDone) {
                    return b.isDone - a.isDone
                }
                return a.dateAdded - b.dateAdded
            })
        }
    }
}

buttonAddTask.addEventListener("click", () => {
    const newTaskLabel = inputNewTaskLabel.value.trim();
    const existingTaskNames = taskList.getAllTasklabels();
    if (existingTaskNames.includes(newTaskLabel)) {
        alert("Il existe déjà une tâche ayant ce nom");
        return;
    }
    const newTask = new Task(newTaskLabel);
    taskList.addTask(newTask);
})