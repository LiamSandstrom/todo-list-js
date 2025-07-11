import { Project } from "./project.js";
import { Sidebar } from "./sidebar.js";
import { Page } from "./render-page.js";
import { Storage } from "./storage.js";

export class ProjectManager {
    // Can sort projects under different managers
  static #managers = new Map();
  #projects;
  #name;
  #id;

  constructor(name, key = crypto.randomUUID()) {
    // this managers projects
    this.#projects = new Map();
    this.#name = name;
    this.#id = key;

    
    ProjectManager.#managers.set(this.#id, this);
  }

  addProject(project) {
    this.#projects.set(project.getId(), project);
  }

  removeProject(key) {
    if(key == Page.getPage()){
      Page.removePage();
      Sidebar.removeCurrentProject();
    }
    
    this.#projects.delete(key);
    Sidebar.populateProjects();
    Storage.setStorage();
  }

  static removeManager(key){
    if(ProjectManager.getManager(key).getProject(Page.getPage()) != undefined){
      Page.removePage();
      Sidebar.removeCurrentProject();
    }

    ProjectManager.#managers.delete(key);
    Sidebar.populateProjects();
    Storage.setStorage();
  }

  static getManagers = () => ProjectManager.#managers;
  static getManager = (key) => ProjectManager.#managers.get(key);
  static getProject (key){
      for (const [managerKey, value] of ProjectManager.getManagers()) {
    const project = value.getProject(key);
    if (project) {
      return project; 
    }
  }
  return null; 
  }
  getAllProjects = () => this.#projects;
  getProject = (key) => this.#projects.get(key);
  getName = () => this.#name;
  getId = () => this.#id;
}
