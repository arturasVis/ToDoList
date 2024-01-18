const content=document.querySelector('.content');

export function loadForm(){

    const popup=document.createElement('div');

    popup.classList.add('popup');

    const form = document.createElement('form');

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

    submitButton.addEventListener("click",(e)=>{
        alert("You pressed me")
    })

    // Create a cancel button
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";

    form.appendChild(label);
    form.appendChild(inputField);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    popup.appendChild(form);

    content.appendChild(popup);

}