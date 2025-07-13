import { ProjectManager } from "./project-manager";
import { Project } from "./project";
import { TodoItem } from "./todo-item";

export class Storage {
  static isLoaded = () => localStorage.getItem("firstLoad");
  static setLoaded = (value) => localStorage.setItem("firstLoad", value);

  static load() {
    //Storage.setLoaded("false")
    if (Storage.isLoaded() !== "true") {
      Storage.firstLoad();
      return;
    }

    console.log("normal load");
    Storage.#loadManagers();
    Storage.#loadProjects();
    Storage.#loadTodos();

  }
  static #loadManagers() {
    for (const manager of Storage.#getManagers()) {
      new ProjectManager(manager.name, manager.key);
    }
  }

  static #loadProjects() {
    for (const project of Storage.#getProjects()) {
      const manager = ProjectManager.getManager(project.manager);
      new Project(manager, project.name, project.key);
    }
  }

  static #loadTodos(){
    for (const todo of Storage.#getTodos()){
        const project = ProjectManager.getProject(todo.project)
        console.log(todo.dueDate)
        new TodoItem(project,todo.title, todo.desc,todo.dueDate,todo.prio);
    }
  }

  static firstLoad() {
    console.log("first load");
    Storage.setLoaded("true");

    const myProjects = new ProjectManager("My Projects");
    const myProject = new Project(myProjects, "My Project");
    new TodoItem(myProject, "Click me!", "Click checkbox to finish a task", new Date().toISOString().split("T")[0], 1)

    Storage.setStorage();
  }

  static setSelectedProject(projectKey){
    localStorage.setItem("selectedProject", projectKey)
  }

  static getSelectedProject = () => localStorage.getItem("selectedProject");

  static setStorage() {
    const managers = [];
    const projects = [];
    const todos = [];

    ProjectManager.getManagers().forEach((manager, managerKey) => {
      const managerValues = {};
      managerValues.key = managerKey;
      managerValues.name = manager.getName();

      managers.push(managerValues);

      manager.getAllProjects().forEach((project, projKey) => {
        const projectValues = {};
        projectValues.manager = managerKey;
        projectValues.name = project.getName();
        projectValues.key = projKey;

        projects.push(projectValues);

        for(const todoKey of project.getOrder()) {
          const todo = project.getItem(todoKey)
          const todoValues = {};
          todoValues.project = projKey;
          todoValues.title = todo.getTitle();
          todoValues.desc = todo.getDescription();
          todoValues.dueDate = todo.getDueDate();
          todoValues.prio = todo.getPriority();
          todos.push(todoValues);
        }
      });
    });
    localStorage.setItem("managers", JSON.stringify(managers));
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  static #getManagers = () => JSON.parse(localStorage.getItem("managers"));
  static #getProjects = () => JSON.parse(localStorage.getItem("projects"));
  static #getTodos = () => JSON.parse(localStorage.getItem("todos"));
}
