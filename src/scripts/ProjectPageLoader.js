import Back from '../assets/back_button.png'
import Edit_button from '../assets/edit-text.png'
import dropDownImg from '../assets/arrow-down.png'
import { CreateProjectButton } from './ProjectCardLoader';
import { reloadProjects } from './ProjectCardLoader';
import { ClearContent } from '..';
import { loadSaved } from './Project';
import { createTask } from './task';


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
    content.id=project.title

    title.innerHTML=project.title;

    mainScreen.classList.add('mainScreen');
    sideBar.classList.add("sideBar");
    main_top.classList.add("main_top")
    main_bottom.classList.add('main_bottom');

    sideBar.appendChild(back_button);

    main_top.appendChild(title);

    mainScreen.appendChild(main_top);
    mainScreen.appendChild(main_bottom)

    content.appendChild(sideBar);
    content.appendChild(mainScreen);
    loadTasks()
}

function createTaskItem(task){
    const taskContainer=document.createElement('div');
    const labelContainer=document.createElement('div');
    const bottomContainer=document.createElement('div');
    const itemContainer=document.createElement('label');
    const main_bottom=document.querySelector('.main_bottom');
    const checkBox=document.createElement('input');
    const checkMark=document.createElement('span');
    const editButton=document.createElement('img');
    const dropDown=document.createElement('img');
    const editDivCont=document.createElement('div');

    dropDown.src=dropDownImg;
    editButton.src=Edit_button;
    editButton.classList.add('edit-button');
    itemContainer.classList.add("container");
    checkMark.classList.add('checkmark');
    checkBox.type='checkbox';
    dropDown.classList.add('drop-down')
    itemContainer.innerHTML=task.title;
    bottomContainer.classList.add('bottom-container')
    editDivCont.addEventListener("click",(e)=>{
        itemContainer.contentEditable=true;
    })
    bottomContainer.appendChild(dropDown);
    editDivCont.appendChild(editButton);
    itemContainer.appendChild(checkBox);
    itemContainer.appendChild(checkMark);
    itemContainer.appendChild(editDivCont);
    labelContainer.appendChild(itemContainer);
    taskContainer.appendChild(labelContainer);
    taskContainer.appendChild(bottomContainer)
    main_bottom.appendChild(taskContainer)
}
function loadTasks(){
    content.classList.remove("main-menu");
    content.classList.add("project-menu");
    const project=loadSaved(localStorage.getItem(content.id))
    for(let i=0;i<project.tasks.length;i++){
        
        try {
            const taskObj=project.tasks[i]
            const task=createTask(taskObj.title,taskObj.checked,taskObj.notes)
            if(task.title!=undefined)
                createTaskItem(task)
        } catch (error) {
            console.log("Encountered error while loading tasks: "+error)
        }
    }

}