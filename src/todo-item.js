export class TodoItem {
  #project;
  #title;
  #description;
  #dueDate;
  #priority;

  constructor(project, title, description, dueDate, priority) {
    this.#project = project;
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
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
