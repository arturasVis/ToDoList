import { CreateProjectCard } from "./ProjectCardLoader";

const content=document.querySelector('.content');

export function loadForm(){

    const popup=document.createElement('div');

    popup.classList.add('popup');

    const form = document.createElement('form');
    form.classList.add("popup_form")

    const label=document.createElement('label');
    label.textContent='Project Title:';
    label.setAttribute("for","inputField");

    const inputField=document.createElement('input')
    inputField.type = "text";
    inputField.id = "inputField";
    inputField.name = "inputField";

    const submitButton = document.createElement("button");
    submitButton.type="button"
    submitButton.textContent = "Add";
    function createProcess(){
        if(inputField.value!=""){
            CreateProjectCard(inputField.value);
            close();
        }
    }
    submitButton.addEventListener("click",(e)=>{
        createProcess();
    })
    form.addEventListener("keydown",(e)=>{
        if(e.key==="Enter"){
            createProcess();
        }
    })

    // Create a cancel button
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click",(e)=>{
        close()
    })

    form.appendChild(label);
    form.appendChild(inputField);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    popup.appendChild(form);

    content.appendChild(popup);

}

function close(){
    try {
        const container=document.querySelector(".popup");
        container.remove();
    } catch (error) {
        console.log("No div found")
    }
    
}