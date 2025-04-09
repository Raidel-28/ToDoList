# Todo list

Brief to experiment with object-oriented programming through creating a todo list with html, css and javascript.

## Main class and object
* Task
    * id : used to find the task.
    * label : name of the task.
    * dateAdded : date the task was added.
    * dateDone : date the task was marked done.
    * isDone : boolean for if the task is finished.
    * createTaskElement : creates and returns a DOM listItem element containing the DOM presenting data of this task.
    * setCompletion: changes the isDone and dateDone property based on given boolean.

* taskList
    * domElement : reference to the domElement this objects will manage.
    * tasks : array containing all existing tasks.
    * addTask : takes in a task instance and pushes it into the tasks array before refreshing the list display.
    * removeTask : takes in a task id that is used to remove a task from the tasks array and then refresh the display.
    * clearList : clears all the dom children from this object's domElement.
    * render : iterate through all existing tasks and for each task creates its corresponding DOM list item and append it to this domElement list.
    * refresh : combines clearList and render to recreate the tasks components in the dom from scratch.
    * getAllTasklabels : returns an array containing the label value of all currently managed tasks.
    * sortByCompletionState : sorts the task array based on completion status and added date of all tasks.

## Flow
1. User fills a label for a task to add.
2. User click on the "Ajouter" button to add the new task.
3. New task is added to the list.
4. User can then manage this task by marking it as done changing it's display or delete it to remove from the list.
5. Rince and repeat.

## Features
* Prevents a new task to be added if its intended label matches an already existing task.
* On adding, removing and changing the completion status of a given task, the display is refreshed.
* When the display is refreshed, the list of tasks will be sorted to first show unfinished tasks.