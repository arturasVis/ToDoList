import Back from '../assets/back_button.png'
import { CreateProjectButton } from './ProjectCardLoader';
import { reloadProjects } from './ProjectCardLoader';
import { ClearContent } from '..';

const content = document.querySelector('.content');

export function LoadProjectView(project){

    const sideBar=document.createElement('div');
    const mainScreen=document.createElement('div');
    const main_top=document.createElement('div');
    const main_bottom=document.createElement('div');
    const title=document.createElement('h1');
    const back_button=document.createElement('div');
    const img=document.createElement('img');
    
    back_button.addEventListener("click",(e)=>{
        ClearContent();
        CreateProjectButton();
        reloadProjects();
    })
    img.src=Back
    back_button.appendChild(img);
    content.classList.remove("main-menu")
    content.classList.add("project-menu")

    title.innerHTML=project.title;

    mainScreen.classList.add('mainScreen');
    sideBar.classList.add("sideBar");

    sideBar.appendChild(back_button);

    main_top.appendChild(title);

    mainScreen.appendChild(main_top);
    mainScreen.appendChild(main_bottom)

    content.appendChild(sideBar);
    content.appendChild(mainScreen);

}