import { Project } from "./project.js";
import { Sidebar } from "./sidebar.js";
import { Page } from "./render-page.js";

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
    if(key == Page.getPage()){
      Page.removePage();
      Sidebar.removeCurrentProject();
    }
    
    this.#projects.delete(key);
    Sidebar.populateProjects();
  }

  static removeManager(key){
    if(ProjectManager.getManager(key).getProject(Page.getPage()) != undefined){
      Page.removePage();
      Sidebar.removeCurrentProject();
    }

    ProjectManager.#managers.delete(key);
    Sidebar.populateProjects();

  }

  static getManagers = () => ProjectManager.#managers;
  static getManager = (key) => ProjectManager.#managers.get(key);
  getAllProjects = () => this.#projects;
  getProject = (key) => this.#projects.get(key);
  getName = () => this.#name;
  getId = () => this.#id;
}
