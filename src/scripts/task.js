export function createTask(title,checked=false,notes=""){
    const task={
        title,
        checked,
        notes,

        updateTitle(newTitle){
            this.title=newTitle
        }
    }
    return task
}

export function loadSavedTask(storage){
    const task=JSON.parse(storage);
    return createTask(task.title,task.checked,task.notes)
}