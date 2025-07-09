import "./styles.css";
import { TodoItem } from "./todo-item.js";
import { Project } from "./project.js";
import { ProjectManager } from "./project-manager.js";

import { Sidebar } from "./sidebar.js";
import { assignSidebarAnimation } from "./hookupSidebarAnim.js";

const myProjects = new ProjectManager("My Projects");
const herProjects = new ProjectManager("Her Projects");

new Project(myProjects, "Work", "red");
new Project(myProjects, "Train", "blue");

assignSidebarAnimation();

Sidebar.populateProjects();


//add todo item
    // - ui for getting to pop up
    // - create pop up 
    // - add functionality for pop up

//add project item
    // - ui for getting to pop up
    // - create pop up 
    // - add functionality for pop up

//Change todo item
//Change project

//
