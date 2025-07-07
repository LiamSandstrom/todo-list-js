import { Project } from "./project.js";

export class ProjectManager {
    // Can sort projects under different managers
  static #managers = new Map();
  #projects;
  #name;
  #id;

  constructor(name) {
    // this managers projects
    this.#projects = new Map();
    this.#name = name;
    this.#id = crypto.randomUUID();

    
    ProjectManager.#managers.set(this.#id, this);
  }

  addProject(project) {
    const id = crypto.randomUUID();
    this.#projects.set(id, project);
  }

  removeProject(key) {
    this.#projects.delete(key);
  }

  static getManagers = () => ProjectManager.#managers;
  getAllProjects = () => this.#projects;
  getName = () => this.#name;
  getId = () => this.#id;
}
