export function createProject(title,tasks=[]){
    const project={
        title,
        tasks,
        addTask(task){
            this.tasks.push(task);
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
export function loadSaved(localProject){
    const project=createProject(localProject.title,localProject.tasks);

    return project;
}