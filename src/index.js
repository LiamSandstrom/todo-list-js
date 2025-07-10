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


//add project popup
//add project
//Change project
//remove project

//when checked remove
//move to completed tab 