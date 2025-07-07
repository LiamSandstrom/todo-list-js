import "./styles.css";
import { TodoItem } from "./todo-item.js";
import { Project } from "./project.js";
import { ProjectManager } from "./project-manager.js";
import { Sidebar } from "./sidebar.js";

const myProjects = new ProjectManager("My Projects");
const herProjects = new ProjectManager("Her Projects");

new Project(myProjects, "Work", "red");
new Project(myProjects, "Train", "blue");

const container = document.querySelector("#container")
const sidebar = new Sidebar(container);
sidebar.render();

//projects factory
// - default Project
// - create new Projects

//projectsManager
// - get / - add / - remove projects
// - helper functions

//project
// - keep track of todo-items
// - title
// - color

//todo-item
// - title
// - description
// - dueDate
// - prio
// - checked

//local storage

//dom Stuff
// - render projects in list
// - make new screen with todo-items
// - render todo-items
// - todo on click create pop-up

// index
// -- button logic in a module
