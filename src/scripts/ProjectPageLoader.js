import Back from '../assets/back_button.png'
import Edit_button from '../assets/edit-text.png'
import dropDownImg from '../assets/arrow-down.png'
import plusIcon from '../assets/plus-sign.png'
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
    const plusImg=document.createElement('img');
    const plusDiv=document.createElement('div')

    
    back_button.addEventListener("click",(e)=>{
        ClearContent();
        CreateProjectButton();
        reloadProjects();
    })
    img.src=Back
    plusImg.src=plusIcon;
    back_button.appendChild(img);
    plusDiv.appendChild(plusImg)
    plusDiv.classList.add('plus-img');
    content.classList.remove("main-menu")
    content.classList.add("project-menu")
    content.id=project.title
    plusDiv.addEventListener("click",(e)=>{
        alert("Gay")
    })
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
    addEventsToCheckmarks();
    main_bottom.appendChild(plusDiv);
    mainScreen.appendChild(main_bottom);
    content.appendChild(mainScreen)
}

function createTaskItem(task,i){
    const taskContainer=document.createElement('div');
    const labelContainer=document.createElement('div');
    const bottomContainer=document.createElement('div');
    const itemContainer=document.createElement('div');
    const taskLabel=document.createElement('label');
    const main_bottom=document.querySelector('.main_bottom');
    const checkBox=document.createElement('input');
    const checkMark=document.createElement('span');
    const editButton=document.createElement('img');
    const dropDown=document.createElement('img');
    const editDivCont=document.createElement('div');

    dropDown.src=dropDownImg;
    editButton.src=Edit_button;

    editButton.classList.add('edit-button');
    labelContainer.classList.add("container");
    itemContainer.classList.add("item-container");
    taskContainer.classList.add("task-container");
    checkMark.classList.add('checkmark');
    checkBox.id="Task"+i;
    taskLabel.htmlFor=checkBox.id;
    checkBox.type='checkbox';
    dropDown.classList.add('drop-down')
    taskLabel.innerHTML=task.title;
    taskContainer.id=i;
    bottomContainer.classList.add('bottom-container')
    
    editDivCont.addEventListener("click",(e)=>{
        taskLabel.contentEditable=true;
        setEndOfContenteditable(taskLabel);
    })
    taskLabel.addEventListener("blur",(e)=>{
        turnOffEdit();
    })
    taskLabel.addEventListener("keypress",(e)=>{
        if(e.key==='Enter'){
            turnOffEdit();
        }
    })
    // checkBox.addEventListener("change",(e)=>{
    //     alert("It changed")
    // })
    bottomContainer.appendChild(dropDown);
    editDivCont.appendChild(editButton);
    itemContainer.appendChild(taskLabel)
    itemContainer.appendChild(checkBox);
    itemContainer.appendChild(checkMark);
    labelContainer.appendChild(itemContainer);
    labelContainer.appendChild(editDivCont);
    taskContainer.appendChild(labelContainer);
    taskContainer.appendChild(bottomContainer)
    main_bottom.appendChild(taskContainer)
    function turnOffEdit(){
        const project=loadSaved(localStorage.getItem(content.id))
        taskLabel.contentEditable=false;
        const newTask=taskLabel.textContent;
        project.updateTask(newTask,i)

    }
    
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
                createTaskItem(task,i)
        } catch (error) {
            console.log("Encountered error while loading tasks: "+error)
        }
    }

}
function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}
function addEventsToCheckmarks(){
        const checkmarks = document.querySelectorAll('.item-container .checkmark');
    
        checkmarks.forEach(function(checkmark) {
            checkmark.addEventListener('click', function() {
                // Find the sibling input checkbox element
                const inputCheckbox = this.previousElementSibling;
                // Toggle the checkbox state
                inputCheckbox.checked = !inputCheckbox.checked;
                // Trigger any change events attached to the checkbox
                inputCheckbox.dispatchEvent(new Event('change'));
            });
        });
    
}