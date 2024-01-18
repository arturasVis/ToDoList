import './styles/styles.css'
import './styles/reset.css'
import { CreateProjectCard } from './scripts/ProjectCardLoader';
import { CreateProjectButton } from './scripts/ProjectCardLoader';
import { createProject } from './scripts/Project';
import { loadSaved } from './scripts/Project';

const button=document.querySelector('#button');
CreateProjectButton();
const testProject=createProject("Lol")

testProject.addTask("Get shit done")
console.log(testProject)
testProject.listTasks()
const localProject=loadSaved(JSON.parse(sessionStorage.getItem("Lol")))
console.log(localProject)
localProject.listTasks();