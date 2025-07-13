import "./styles.css";
import { TodoItem } from "./todo-item.js";
import { Project } from "./project.js";
import { ProjectManager } from "./project-manager.js";
import { Sidebar } from "./sidebar.js";
import { assignSidebarAnimation } from "./hookupSidebarAnim.js";
import { Storage } from "./storage.js";
import { Page } from "./render-page.js";

Storage.load();



assignSidebarAnimation();

Sidebar.populateProjects();

Page.firstRender();


//save