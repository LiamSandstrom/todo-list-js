import { TodoItem } from "./todo-item.js";

export class Project {
  #items;
  #name;
  #color;
  constructor(name, color) {
    this.#items = new Set();
    this.#name = name;
    this.#color = color;

    new TodoItem(this, "bob");
    new TodoItem(this, "lop");
    new TodoItem(this, "katt");
    new TodoItem(this, "hund");
  }

  addItem(item) {
    this.#items.add(item);
  }

  removeItem(item) {
    this.#items.delete(item);
  }

  //getters
  getItems = () => this.#items;
  getName = () => this.#name;
  getColor = () => this.#color;

  //setters
  setName = () => this.#name;
  setColor = () => this.#color;
}
