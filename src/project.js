import { ProjectManager } from "./project-manager.js";
import { TodoItem } from "./todo-item.js";

export class Project {
  #items;
  #name;
  #color;
  #projectManager;

  constructor(projectManager, name, color) {
    if(projectManager == null && typeof projectManager.addProject !== "function") throw new Error("Invalid project manager")

    this.#projectManager = projectManager;
    //this projects todo-items
    this.#items = new Map();
    this.#name = name;
    this.#color = color;

    const randomNumber = Math.floor(Math.random() * 10);
    for(let i = 0; i < randomNumber; i++){
      new TodoItem(this, i, "testi")
    }

    this.#projectManager.addProject(this);

  }

  addItem(item) {
    const key = crypto.randomUUID();
    this.#items.set(key, item);
  }

  removeItem(key) {
    this.#items.delete(key);
  }

  //getters
  getItems = () => this.#items;
  getName = () => this.#name;
  getColor = () => this.#color;
  getItemsAmount = () => this.#items.size;

  //setters
  setName = () => this.#name;
  setColor = () => this.#color;
}
