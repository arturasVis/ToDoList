import { CreateProjectCard } from "./ProjectCardLoader";
import { createProject } from './Project';

const content=document.querySelector('.content');

export function showForm(Title){
    const popup=document.createElement('div');

        popup.classList.add('popup');

        const form = document.createElement('form');
        form.classList.add("popup_form")

        const label=document.createElement('label');
        label.textContent=Title;
        label.setAttribute("for","inputField");

        const inputField=document.createElement('input')
        inputField.type = "text";
        inputField.id = "inputField";
        inputField.name = "inputField";

        const submitButton = document.createElement("button");
        submitButton.type="submit"
        submitButton.textContent = "Add";
        submitButton.classList.add("submitButton");
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

export function waitForTitle(){

    return new Promise((resolve)=>{

        const form=document.querySelector(".popup_form")
        form.addEventListener("submit",(e)=>{
            const input=document.querySelector("#inputField");
            close()
            resolve(input.value);
        });

    })

    
}

function close(){
    try {
        const container=document.querySelector(".popup");
        container.remove();
    } catch (error) {
        console.log("No div found")
    }
    
}