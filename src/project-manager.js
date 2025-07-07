import { Project } from "./project.js";

export class ProjectManager {
  static #managers = new Set();
  #projects;
  #name;
  constructor(name) {
    this.#projects = new Set();
    this.#name = name;

    ProjectManager.#managers.add(this);
  }

  addProject(project) {
    this.#projects.add(project);
  }

  removeProject(project) {
    this.#projects.delete(project);
  }

  static getManagers = () => ProjectManager.#managers;
  getAllProjects = () => this.#projects;
  getName = () => this.#name;
}
