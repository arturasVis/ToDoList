import Plus from '../assets/plus.png'
import { loadForm } from './FormLoader';
import { createProject } from './Project';
import { loadSaved } from './Project';
import { ClearContent } from '..';
import { LoadProjectView } from './ProjectPageLoader';

const content=document.querySelector('.content');

export function CreateProjectCard(project){
    const projectCard=document.createElement('div');


    projectCard.classList.add('card');
    projectCard.id=project.title;

    const projectTitle=document.createElement("h1")
    projectCard.addEventListener("click",(e) =>{
        ClearContent();
        const project=loadSaved(localStorage.getItem(e.target.id))
        
        LoadProjectView(project)
    })
    projectTitle.innerHTML=project.title

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
            
            const saved=loadSaved(localStorage.getItem(localStorage.key(i)))
            if(saved.title!=undefined)
                CreateProjectCard(saved)
        } catch (error) {
            console.log("Not JSON"+error)
        }
        
        
    }
}