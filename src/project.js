import { ProjectManager } from "./project-manager.js";
import { TodoItem } from "./todo-item.js";

export class Project {
  #items;
  #name;
  #color;
  #projectManager;
  #order;

  constructor(projectManager, name, color) {
    if(projectManager == null && typeof projectManager.addProject !== "function") throw new Error("Invalid project manager")

    this.#projectManager = projectManager;
    //this projects todo-items
    this.#items = new Map();
    this.#order = [];
    this.#name = name;
    this.#color = color;

    const randomNumber = Math.floor(Math.random() * 10);
    for(let i = 0; i < randomNumber; i++){
      new TodoItem(this, "Item: "+ i, "testi", "2022-11-11")
    }

    this.#projectManager.addProject(this);
    for(const key of this.#items.keys()){
    this.#order.push(key);
    console.log("i")
    }
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
  getItem = (key) => this.#items.get(key);
  getName = () => this.#name;
  getColor = () => this.#color;
  getItemsAmount = () => this.#items.size;
  getOrder = () => this.#order;

  //setters
  setName = () => this.#name;
  setColor = () => this.#color;
  setOrder = (order) => this.#order = order;
}
