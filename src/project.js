import { ProjectManager } from "./project-manager.js";
import { Page } from "./render-page.js";
import { TodoItem } from "./todo-item.js";

export class Project {
  #items;
  #name;
  #color;
  #projectManager;
  #order;
  static #removeAnim = null;

  constructor(projectManager, name, color) {
    if(projectManager == null && typeof projectManager.addProject !== "function") throw new Error("Invalid project manager")

    this.#projectManager = projectManager;
    //this projects todo-items
    this.#items = new Map();
    //keys of todos in order
    this.#order = [];
    this.#name = name;
    this.#color = color;

    const randomNumber = Math.floor(Math.random() * 10);
    for(let i = 0; i < randomNumber; i++){
      new TodoItem(this, "Item: "+ i, "testi", "2022-11-11", 2)
    }

    this.#projectManager.addProject(this);
  }

  addItem(item) {
    const key = crypto.randomUUID();
    this.#items.set(key, item);
    this.#order.push(key);
    console.log(this.#order)
  }

  removeItem(key) {
    this.#items.delete(key);
    const index = this.#order.indexOf(key);
    this.#order.splice(index, 1);
    clearTimeout(Project.#removeAnim)
    Project.#removeAnim = setTimeout(()=> {
      Page.loadPage();
    },500)
  }

  //getters
  getItems = () => this.#items;
  getItem = (key) => this.#items.get(key);
  getName = () => this.#name;
  getColor = () => this.#color;
  getItemsAmount = () => this.#items.size;
  getOrder = () => this.#order;
  getManager = () => this.#projectManager;

  //setters
  setName = () => this.#name;
  setColor = () => this.#color;
  setOrder = (order) => this.#order = order;
}
