import Plus from "../assets/plus.png";
import Delete from "../assets/delete.png";
import { waitForTitle, showForm } from "./FormLoader";
import { createProject, loadSaved } from "./Project";
import { ClearContent } from "..";
import { LoadProjectView } from "./ProjectPageLoader";

const content = document.querySelector(".content");

export function CreateProjectCard (project) {
  const projectCard = document.createElement("div");
  const deleteImg = document.createElement("img");
  const deleteButton = document.createElement("div");

  deleteImg.src = Delete;
  projectCard.classList.add("card");
  projectCard.id = project.title;
  deleteImg.classList.add("edit-button");
  deleteButton.appendChild(deleteImg);
  deleteButton.addEventListener("click", (e) => {
    const userConfrim = confirm("Do you want to delete project?");
    if (userConfrim) {
      localStorage.removeItem(projectCard.id);
      projectCard.remove();
    }
  });

  const projectTitle = document.createElement("h1");
  projectCard.addEventListener("dblclick", (e) => {
    try {
      if (project !== undefined) {
        ClearContent();
        const project = loadSaved(localStorage.getItem(e.target.id));

        LoadProjectView(project);
      }
    } catch (error) {
      console.log("This is a fucking hack!Fix it");
    }
  });
  projectTitle.innerHTML = project.title;

  projectCard.appendChild(projectTitle);
  projectCard.appendChild(deleteButton);
  content.appendChild(projectCard);
}
export function CreateProjectButton () {
  const button = document.createElement("div");
  const img = document.createElement("img");

  button.classList.add("card");
  button.id = "button";
  img.src = Plus;

  button.appendChild(img);
  content.appendChild(button);
  button.addEventListener("click", async (e) => {
    showForm("Project title:");
    const formValue = await waitForTitle();
    const project = createProject(formValue);

    CreateProjectCard(project);
  });
}

export function reloadProjects () {
  content.classList.remove("project-menu");
  content.classList.add("main-menu");
  for (let i = 0; i < localStorage.length; i++) {
    try {
      const saved = loadSaved(localStorage.getItem(localStorage.key(i)));
      if (saved.title !== undefined) { CreateProjectCard(saved); }
    } catch (error) {
      console.log("Not JSON" + error);
    }
  }
}
