import Plus from '../assets/plus.png'
import { loadForm } from './FormLoader';
import { createProject } from './Project';
import { loadSaved } from './Project';
import { ClearContent } from '..';
import { LoadProjectView } from './ProjectPageLoader';

const content=document.querySelector('.content');

export function CreateProjectCard(projectName){
    const projectCard=document.createElement('div');

    const newProject=createProject(projectName);
    projectCard.classList.add('card');
    projectCard.id=projectName;

    const projectTitle=document.createElement("h1")
    projectCard.addEventListener("click",(e) =>{
        ClearContent();
        const project=loadSaved(JSON.parse(localStorage.getItem(e.target.id)))
        console.log(project)
        
        LoadProjectView(project)
    })
    projectTitle.innerHTML=projectName

    projectCard.appendChild(projectTitle)
    content.appendChild(projectCard)
}
export function CreateProjectButton(){
    const button=document.createElement('div');
    const img= document.createElement('img')

    button.classList.add('card');
    button.id='button';
    img.src=Plus

    button.appendChild(img);
    content.appendChild(button);
    button.addEventListener("click",(e)=>{
        loadForm();
    })
}

export function reloadProjects(){
    content.classList.remove("project-menu");
    content.classList.add("main-menu");
    for(let i=0;i < localStorage.length;i++)
    {
        try {
            const localProject=JSON.parse(localStorage.getItem(localStorage.key(i)));
            const saved=loadSaved(localProject)
            if(saved.title!=undefined)
                CreateProjectCard(saved.title)
        } catch (error) {
            console.log("Not JSON"+error)
        }
        
        
    }
}