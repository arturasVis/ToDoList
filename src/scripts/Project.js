export function createProject (title, tasks = []) {
  const project = {
    title,
    tasks,
    addTask (task) {
      this.tasks.push(task);
      this.save();
    },
    listTasks () {
      console.log(this.tasks);
    },
    save () {
      localStorage.setItem(this.title, JSON.stringify(this));
    },
    updateTitle (newTask, index) {
      this.tasks[index].title = newTask;
      this.save();
    },
    updateChecked (state, index) {
      this.tasks[index].checked = state;
      this.save();
    },
    updateNotes (notes, index) {
      this.tasks[index].notes = notes;
      this.save();
    }
  };

  localStorage.setItem(title, JSON.stringify(project));
  return project;
}
// might not need
export function loadSaved (storage) {
  const localProject = JSON.parse(storage);
  const project = createProject(localProject.title, localProject.tasks);

  return project;
}
