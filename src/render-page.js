import { ProjectManager } from "./project-manager";
import '@vaadin/checkbox';
import { opacityAnimation } from "./opacity-animation";
import Sortable from 'sortablejs';

export class Page {
  static #currentPage;
  static #container = document.querySelector("#todo-container");

  static renderPage(managerKey, projKey) {
    if (projKey == Page.#currentPage) return;
    Page.#removePage();

    const manager = ProjectManager.getManager(managerKey);
    const project = manager.getProject(projKey);

    const sortable = Sortable.create(Page.#container, {
      animation: 300,
      onSort(evt){
        const order = [];
        for(const ele of Page.#container.children){
          order.push(ele.dataset.key);
        }
        manager.getProject(Page.#currentPage).setOrder(order);
        console.log(manager.getProject(Page.#currentPage).getName())
      }
    });
    opacityAnimation(Page.#container, 700);
    Page.#currentPage = projKey;
      console.log("project: " + project.getName())
    
    for(const todoKey of project.getOrder()){
      const todo = project.getItem(todoKey);

      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-item");
      todoDiv.dataset.key = todoKey;

      const checkBox = document.createElement("vaadin-checkbox");
      checkBox.type = "checkbox";
      todoDiv.appendChild(checkBox)

      const todoContentDiv = document.createElement("div");
      todoContentDiv.classList.add("todo-item-content");

      const text = document.createElement("h3");
      text.textContent = todo.getTitle();
      todoContentDiv.appendChild(text);

      const dueDate = document.createElement("p");
      dueDate.textContent = todo.getDueDate();
      todoContentDiv.appendChild(dueDate);

      todoDiv.appendChild(todoContentDiv)
      Page.#container.appendChild(todoDiv);
    };
  }

  static #removePage(){
    Page.#container.innerHTML = "";
  }

}
