import { ProjectManager } from "./project-manager";

export class Sidebar {
  static #sidebarDiv = document.querySelector("#sidebar");
  static #topbarDiv = document.querySelector("#sidebar-topbar");
  static #username = document.querySelector("#topbar-name");
  static #closeButton = document.querySelector("#close-btn");
  static #container = document.querySelector("#container");
  static #sidebarContent = document.querySelector("#sidebar-content");
  static #amounts = new Map();

  static populateProjects() {
    ProjectManager.getManagers().forEach((projManager, key) => {
      const title = document.createElement("h2");
      const managerDiv = document.createElement("div");
      managerDiv.classList.add("category");
      managerDiv.dataset.key = key;

      const categoryDiv = document.createElement("div");
      categoryDiv.appendChild(title);
      categoryDiv.classList.add("category-title-div");
      title.textContent = projManager.getName();
      managerDiv.appendChild(categoryDiv);
      console.log(projManager);

      projManager.getAllProjects().forEach((project, projKey) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-div");
        projectDiv.dataset.key = projKey;

        const projectTitle = document.createElement("h3");
        projectTitle.textContent = "# " + project.getName();
        projectDiv.appendChild(projectTitle);

        const amount = document.createElement("p");
        Sidebar.#amounts.set(amount, project);
        projectDiv.appendChild(amount);


        managerDiv.appendChild(projectDiv);
      });

      Sidebar.updateAmounts();
      Sidebar.#sidebarContent.appendChild(managerDiv);
    });
  }

  static updateAmounts(){
    Sidebar.#amounts.forEach((value, key) => {
      key.textContent = value.getItemsAmount();
    })
  }
}
