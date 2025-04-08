let lastTaskId = 0;

class task {
    id;
    label;
    dateAdded;
    dateDone;
    isDone;
    constructor(label) {
        this.id = lastTaskId;
        lastTaskId++;
        this.label = label;
    }
    createTaskElement() {
        const taskArticle = document.createElement("article")
        taskArticle.className = "task"
        const divTaskDescriptionWrapper = document.createElement("div")
        taskArticle.appendChild(divTaskDescriptionWrapper)
    }

    //     <article class="task">
    //     <div>
    //         <div class="date">
    //             <span class="date-add">2025-04-08 16:19</span>
    //             <span class="date-done">2025-04-08 17:19</span>
    //         </div>
    //         <span class="task-name">tâche 1</span>
    //     </div>
    //     <div>
    //         <button class="check">finie</button>
    //         <button class="del">supprimer</button>
    //     </div>
    // </article>
}