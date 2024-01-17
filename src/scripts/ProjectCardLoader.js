import Plus from '../assets/plus.png'

const content=document.querySelector('.content');

export function CreateProjectCard(){
    

    const projectCard=document.createElement('div');

    projectCard.classList.add('card');
    projectCard.id='project';
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
        CreateProjectCard()
    })
}