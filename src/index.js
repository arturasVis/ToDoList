import './styles/styles.css'
import './styles/reset.css'
import { CreateProjectButton } from './scripts/ProjectCardLoader';
import { reloadProjects } from './scripts/ProjectCardLoader';


CreateProjectButton();
reloadProjects();


export function ClearContent(){
    const div=document.querySelector(".content");
    div.innerHTML=""
}