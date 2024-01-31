import Back from '../assets/back_button.png'
import Edit_button from '../assets/edit-text.png'
import dropDownImg from '../assets/arrow-down.png'
import plusIcon from '../assets/plus-sign.png'
import deltetImg from '../assets/delete.png'
import { CreateProjectButton } from './ProjectCardLoader';
import { reloadProjects } from './ProjectCardLoader';
import { ClearContent } from '..';
import { loadSaved } from './Project';
import { createTask } from './task';
import { waitForTitle } from './FormLoader';
import { showForm } from './FormLoader'


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
    
    img.src=Back;
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
    addEventsToCheckmarks();
    addAddButton();
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
    const deleteButtonImg=document.createElement('img');
    const deleteButton=document.createElement('div');
    const buttonsCont=document.createElement('div');

    dropDown.src=dropDownImg;
    editButton.src=Edit_button;
    deleteButtonImg.src=deltetImg;

    editButton.classList.add('edit-button');
    deleteButtonImg.classList.add('edit-button');
    labelContainer.classList.add("container");
    itemContainer.classList.add("item-container");
    taskContainer.classList.add("task-container");
    checkMark.classList.add('checkmark');
    buttonsCont.classList.add('buttonsCont');
    checkBox.id="Task"+i;
    taskLabel.htmlFor=checkBox.id;
    checkBox.type='checkbox';
    checkBox.checked=task.checked;
    dropDown.classList.add('drop-down')
    taskLabel.innerHTML=task.title;
    taskContainer.id=i;
    bottomContainer.classList.add('bottom-container')

    
    editDivCont.addEventListener("click",(e)=>{
        taskLabel.contentEditable=true;
        setEndOfContenteditable(taskLabel);
    })
    taskLabel.addEventListener("blur",(e)=>{
        updateTitle(taskLabel.textContent,i);
        taskLabel.contentEditable=false;
    })
    taskLabel.addEventListener("keypress",(e)=>{
        if(e.key==='Enter'){
            updateTitle(taskLabel.textContent,i);
            taskLabel.contentEditable=false;
        }
    })
    deleteButton.addEventListener("click",(e)=>{
        deleteTask(i);
    })
    checkBox.addEventListener("change",(e)=>{
         updateCheckbox(checkBox.checked,i);
    })
    dropDown.addEventListener("click",(e)=>{
        const id="Textarea"+task.title
        if(!document.getElementById(id))
        {
            const textarea=document.createElement("textarea");
            textarea.id=id;
            textarea.rows=8;
            textarea.cols=100;
            textarea.style.width="100%";
            textarea.style.padding="10px";
            textarea.placeholder="Enter your notes here..."
            textarea.value=loadSaved(localStorage.getItem(content.id)).tasks[i].notes;
            textarea.addEventListener("keypress",(e)=>{
                if(e.key==="Enter"){
                    const textarea=document.getElementById(id);
                    textarea.remove();
                    dropDown.style.transform = 'rotate(0deg)';
                    updateNotes(textarea.value,i);
                }
            })
            bottomContainer.insertBefore(textarea,dropDown);
            textarea.focus();
            dropDown.style.transform = 'rotate(180deg)';
        }else{
            const textarea=document.getElementById(id);
            textarea.remove();
            dropDown.style.transform = 'rotate(0deg)';
            updateNotes(textarea.value,i);
        }
    })
    bottomContainer.appendChild(dropDown);
    editDivCont.appendChild(editButton);
    deleteButton.appendChild(deleteButtonImg);
    itemContainer.appendChild(taskLabel)
    itemContainer.appendChild(checkBox);
    itemContainer.appendChild(checkMark);
    labelContainer.appendChild(itemContainer);
    buttonsCont.appendChild(editDivCont);
    buttonsCont.appendChild(deleteButton);
    labelContainer.appendChild(buttonsCont);
    taskContainer.appendChild(labelContainer);
    taskContainer.appendChild(bottomContainer);
    main_bottom.appendChild(taskContainer);
    
}
function updateTitle(task,i){
    const project=loadSaved(localStorage.getItem(content.id))
    project.updateTitle(task,i)
}
function updateCheckbox(state,i){
    const project=loadSaved(localStorage.getItem(content.id))
    project.updateChecked(state,i);
}
function updateNotes(notes,i){
    const project=loadSaved(localStorage.getItem(content.id))
    project.updateNotes(notes,i);
}

function loadTasks(){
    content.classList.remove("main-menu");
    content.classList.add("project-menu");
    const main_bottom=document.querySelector(".main_bottom")
    const project=loadSaved(localStorage.getItem(content.id))
    main_bottom.innerHTML=""
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
function deleteTask(index){
    const project=loadSaved(localStorage.getItem(content.id))

    project.tasks.splice(index,1);
    project.save();
    loadTasks();
    addAddButton();
}
function addAddButton(){
    const plusImg=document.createElement('img');
    const plusDiv=document.createElement('div');
    const main_bottom=document.querySelector('.main_bottom');
    const mainScreen=document.querySelector('.mainScreen'); 
    plusDiv.appendChild(plusImg)
    plusDiv.classList.add('plus-img');
    plusImg.src=plusIcon;
    plusDiv.addEventListener("click",async (e)=>{
        showForm("Enter the task");
        addTask(await waitForTitle());
    })
    main_bottom.appendChild(plusDiv);
    mainScreen.appendChild(main_bottom);
    content.appendChild(mainScreen)
}
function addTask(title){
    const task=createTask(title);
    const project=loadSaved(localStorage.getItem(content.id))
    project.addTask(task);
    project.save();
    loadTasks();
}