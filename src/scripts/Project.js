import { createTask } from "./task";
export function createProject(title,tasks=[]){
    const project={
        title,
        tasks,
        addTask(task){
            const taskObj=createTask(task)
            this.tasks.push(taskObj);
            this.save()
        },
        listTasks(){
            console.log(this.tasks)
        },
        save(){
            localStorage.setItem(this.title,JSON.stringify(this))
        }
    }
    
    localStorage.setItem(title,JSON.stringify(project));
    return project;
}
//might not need
export function loadSaved(storage){
    const localProject=JSON.parse(storage);
    const project=createProject(localProject.title,localProject.tasks);

    return project;
}