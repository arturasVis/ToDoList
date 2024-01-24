export function createTask(title,checked=false,notes=""){
    const task={
        title,
        checked,
        notes,
    }

    return task
}

export function loadSavedTask(storage){
    const task=JSON.parse(storage);
    return createTask(task.title,task.checked,task.notes)
}

/*
TODO
So I need to make it so tasks are save as their separate project to localstorage, and the task titles are asinged to the task array in the project

Once load a project just load all the task from the array by getting the objects and converting them back to objects from titles and grabing them from
local storage.  


*/