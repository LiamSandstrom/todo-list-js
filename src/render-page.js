import { ProjectManager } from "./project-manager";
import "@vaadin/checkbox";
import { opacityAnimation } from "./opacity-animation";
import Sortable from "sortablejs";
import { Popup } from "./popup";
import { todoPopup } from "./add-todo-popup";

export class Page {
  static #currentPage;
  static #container = document.querySelector("#todo-container");
  static #sortableDiv = document.createElement("div");
  static #managerKey;
  static #projKey;

  static renderPage(managerKey, projKey) {
    if (projKey == Page.#currentPage) return;
    Page.#managerKey = managerKey;
    Page.#projKey = projKey;
    Page.loadPage();
    opacityAnimation(Page.#container, 700);
  }

  static loadPage() {
    console.log("LOAD");
    const managerKey = Page.#managerKey;
    const projKey = Page.#projKey;
    const manager = ProjectManager.getManager(managerKey);
    const project = manager.getProject(projKey);
    Page.#removePage();

    Page.#renderAddTodo(project);
    Page.#container.appendChild(Page.#sortableDiv);
    Page.#sortableDiv.classList.add("sortable-container");

    const sortable = Sortable.create(Page.#sortableDiv, {
      animation: 300,
      onSort(evt) {
        const order = [];
        for (const ele of Page.#sortableDiv.children) {
          order.push(ele.dataset.key);
        }
        manager.getProject(Page.#currentPage).setOrder(order);
      },
    });

    Page.#currentPage = projKey;

    for (const todoKey of project.getOrder()) {
      const todo = project.getItem(todoKey);

      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-item");
      todoDiv.dataset.key = todoKey;

      const checkBox = document.createElement("vaadin-checkbox");
      checkBox.type = "checkbox";
      todoDiv.appendChild(checkBox);

      const todoContentDiv = document.createElement("div");
      todoContentDiv.classList.add("todo-item-content");

      const text = document.createElement("h3");
      text.textContent = todo.getTitle();
      todoContentDiv.appendChild(text);

      const dueDate = document.createElement("p");
      dueDate.textContent = todo.getDueDate();
      todoContentDiv.appendChild(dueDate);

      todoDiv.appendChild(todoContentDiv);
      Page.#sortableDiv.appendChild(todoDiv);

      todoDiv.addEventListener("click", () =>
        Popup.render(todoPopup(project, todoKey))
      );

      checkBox.addEventListener("click", (event) => {
        event.stopPropagation();
      })
    }
  }

  static #removePage() {
    Page.#container.innerHTML = "";
    Page.#sortableDiv.innerHTML = "";
  }

  static #renderAddTodo(project) {
    const div = document.createElement("div");
    div.classList.add("add-todo-container");

    const plus = document.createElement("p");
    plus.textContent = "+";
    div.appendChild(plus);

    const text = document.createElement("p");
    text.textContent = "Add todo...";
    div.appendChild(text);

    Page.#container.appendChild(div);

    div.addEventListener("click", () => Popup.render(todoPopup(project)));
  }
  static getPage = () => Page.#currentPage;
}
