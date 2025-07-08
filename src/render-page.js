import { ProjectManager } from "./project-manager";

export class Page {
  static #currentPage;
  static #container = document.querySelector("#todo-container");

  static renderPage(managerKey, projKey) {
    if (projKey == Page.#currentPage) return;
    Page.#removePage();

    Page.#currentPage = projKey;
    const manager = ProjectManager.getManager(managerKey);

    const project = manager.getProject(projKey);

    project.getItems().forEach((todo, key) => {
      const text = document.createElement("p");
      text.textContent = todo.getTitle();
      Page.#container.appendChild(text);
    });
  }

  static #removePage(){
    console.log(Page.#container)
    Page.#container.innerHTML = "";
  }
}
