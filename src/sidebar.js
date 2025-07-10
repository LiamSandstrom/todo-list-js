import { ProjectManager } from "./project-manager";
import { Page } from "./render-page";
import { projectPopup } from "./add-project-popup";
import { Popup } from "./popup";
import { categoryPopup } from "./add-category-popup";
import deleteImg from "./icons/delete.svg"

export class Sidebar {
  static #sidebarDiv = document.querySelector("#sidebar");
  static #topbarDiv = document.querySelector("#sidebar-topbar");
  static #username = document.querySelector("#topbar-name");
  static #closeButton = document.querySelector("#close-btn");
  static #container = document.querySelector("#container");
  static #sidebarContent = document.querySelector("#sidebar-content");
  static #amounts = new Map();
  static #currentProject;
  static #currentProjectKey;

  static populateProjects() {
    Sidebar.#sidebarContent.innerHTML = "";
    Sidebar.#renderAddCategory();
    console.log(Sidebar.#currentProject)
    
    ProjectManager.getManagers().forEach((projManager, key) => {
      //Category title
      const title = document.createElement("h2");
      title.textContent = projManager.getName();

      //category Big Div
      const managerDiv = document.createElement("div");
      managerDiv.classList.add("category");
      managerDiv.dataset.key = key;

      //category title Div
      const categoryDiv = document.createElement("div");
      categoryDiv.appendChild(title);
      categoryDiv.classList.add("category-title-div");

      const plusDeleteDiv = document.createElement("div");
      plusDeleteDiv.classList.add("amount-remove-div");

      const plus = document.createElement("p");
      plus.textContent = "+";
      plusDeleteDiv.appendChild(plus)

      const deleteCategory = document.createElement("img");
      deleteCategory.src = deleteImg;
      plusDeleteDiv.appendChild(deleteCategory)

      categoryDiv.appendChild(plusDeleteDiv);

      plus.addEventListener("click", () => {
        Popup.render(projectPopup(key));
      })

      deleteCategory.addEventListener("click", () => {
        ProjectManager.removeManager(key);
      })

      managerDiv.appendChild(categoryDiv);

      projManager.getAllProjects().forEach((project, projKey) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-div");
        projectDiv.dataset.key = projKey;
        projectDiv.dataset.managerKey = key;
        this.#bindProjectOnClick(projectDiv);

        const projectTitle = document.createElement("h3");
        //Project title
        projectTitle.textContent = "# " + project.getName();
        projectDiv.appendChild(projectTitle);

        //amount and remove div
        const amountRemoveDiv = document.createElement("div");
        amountRemoveDiv.classList.add("amount-remove-div")

        //amount text
        const amount = document.createElement("p");
        Sidebar.#amounts.set(amount, project);
        amountRemoveDiv.appendChild(amount)

        //remove
        const remove = document.createElement("img");
        remove.src = deleteImg
        amountRemoveDiv.appendChild(remove)

        remove.addEventListener("click", (event)=> {
          projManager.removeProject(projKey);
          event.stopPropagation();
        })

        projectDiv.appendChild(amountRemoveDiv);

        managerDiv.appendChild(projectDiv);
      });

      Sidebar.updateAmounts();
      Sidebar.#sidebarContent.appendChild(managerDiv);
    });

    console.log(Sidebar.#currentProject)
    if(Sidebar.#currentProject != null){
      const key = Sidebar.#currentProjectKey;
      const proj = document.querySelector('[data-key="' + key + '"]')
      Sidebar.#setCurrentProject(proj)
    }
  }

  static #bindProjectOnClick(project) {
    project.addEventListener("click", () => {
      Page.renderPage(project.dataset.managerKey, project.dataset.key);
      Sidebar.#setCurrentProject(project);
    });
  }

  static #setCurrentProject(project) {
    if (Sidebar.#currentProject != null || Sidebar.#currentProject == project) {
      Sidebar.#currentProject.style.backgroundColor = null;
      Sidebar.#currentProject.style.color = window.getComputedStyle(document.body).getPropertyValue("--main-text-color");
    }
    Sidebar.#currentProject = project;
    Sidebar.#currentProjectKey = project.dataset.key;
    Sidebar.#currentProject.style.backgroundColor = window.getComputedStyle(document.body).getPropertyValue("--selected-bg");
    Sidebar.#currentProject.style.color = window.getComputedStyle(document.body).getPropertyValue("--accent-color");
  }

  static updateAmounts() {
    Sidebar.#amounts.forEach((value, key) => {
      key.textContent = value.getItemsAmount();
    });
  }

  static #renderAddCategory(){

    const div = document.createElement("div");
    div.classList.add("add-todo-container");
    div.classList.add("category-padding");

    const plus = document.createElement("p");
    plus.textContent = "+";
    div.appendChild(plus);

    const text = document.createElement("p");
    text.textContent = "Add Category...";
    div.appendChild(text);

    Sidebar.#sidebarContent.appendChild(div);

    div.addEventListener("click", () => {Popup.render(categoryPopup())});
  }

  static removeCurrentProject = () => {
    Sidebar.#currentProject = null;
    Sidebar.#currentProjectKey = null;
  }
}
