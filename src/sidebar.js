import { ProjectManager } from "./project-manager";
import { Page } from "./render-page";

export class Sidebar {
  static #sidebarDiv = document.querySelector("#sidebar");
  static #topbarDiv = document.querySelector("#sidebar-topbar");
  static #username = document.querySelector("#topbar-name");
  static #closeButton = document.querySelector("#close-btn");
  static #container = document.querySelector("#container");
  static #sidebarContent = document.querySelector("#sidebar-content");
  static #amounts = new Map();
  static #currentProject;

  static populateProjects() {
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

        //amount text
        const amount = document.createElement("p");
        Sidebar.#amounts.set(amount, project);
        projectDiv.appendChild(amount);

        managerDiv.appendChild(projectDiv);
      });

      Sidebar.updateAmounts();
      Sidebar.#sidebarContent.appendChild(managerDiv);
    });
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
    Sidebar.#currentProject.style.backgroundColor = window.getComputedStyle(document.body).getPropertyValue("--selected-bg");
    Sidebar.#currentProject.style.color = window.getComputedStyle(document.body).getPropertyValue("--accent-color");
  }

  static updateAmounts() {
    Sidebar.#amounts.forEach((value, key) => {
      key.textContent = value.getItemsAmount();
    });
  }
}
