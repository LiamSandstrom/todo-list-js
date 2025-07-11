import { ProjectManager } from "./project-manager.js";
import { Page } from "./render-page.js";
import { TodoItem } from "./todo-item.js";
import { Storage } from "./storage.js";

export class Project {
  #items;
  #name;
  #projectManager;
  #order;
  #id;

  static #removeAnim = null;

  constructor(projectManager, name, key = crypto.randomUUID()) {
    if(projectManager == null && typeof projectManager.addProject !== "function") throw new Error("Invalid project manager")

    this.#projectManager = projectManager;
    //this projects todo-items
    this.#items = new Map();
    //keys of todos in order
    this.#order = [];
    this.#name = name;
    this.#id = key;

    this.#projectManager.addProject(this);
  }

  addItem(item) {
    const key = crypto.randomUUID();
    this.#items.set(key, item);
    this.#order.push(key);
    Storage.setStorage();
  }

  removeItem(key) {
    this.#items.delete(key);
    const index = this.#order.indexOf(key);
    this.#order.splice(index, 1);
    clearTimeout(Project.#removeAnim)
    Project.#removeAnim = setTimeout(()=> {
      Page.loadPage();
    },500)
    Storage.setStorage();
  }

  //getters
  getItems = () => this.#items;
  getItem = (key) => this.#items.get(key);
  getName = () => this.#name;
  getItemsAmount = () => this.#items.size;
  getOrder = () => this.#order;
  getManager = () => this.#projectManager;
  getId = ()=> this.#id;

  //setters
  setName = () => this.#name;
  setOrder = (order) => this.#order = order;
}
