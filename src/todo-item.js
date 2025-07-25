export class TodoItem {
  #project;
  #title;
  #description;
  #dueDate;
  #priority;

  constructor(project, title, description, dueDate, priority) {
    if(project == null || typeof project.addItem !== "function") throw new Error("Todo item needs to be assigned a project");

    this.#project = project;
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;

    this.#project.addItem(this);
  }

  //getters
  getProject = () => this.#project;
  getTitle = () => this.#title;
  getDescription = () => this.#description;
  getDueDate = () => this.#dueDate;
  getPriority = () => this.#priority;

  //setters
  setProject = (input) => this.#project = project;
  setTitle = (input) => (this.#title = input);
  setDescription = (input) => (this.#description = input);
  setDueDate = (input) => (this.#dueDate = input);
  setPriority = (input) => (this.#priority = input);
}
