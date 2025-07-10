import { ProjectManager } from "./project-manager";
import { Project } from "./project";
import { Sidebar } from "./sidebar";
import { Popup } from "./popup";

export function categoryPopup() {
  const div = document.createElement("div");
  div.classList.add("project-popup");

  const name = document.createElement("input");
  name.placeholder = "Category name...";
  name.classList.add("popup-title");
  div.appendChild(name);

  const saveBtn = document.createElement("button");
  saveBtn.classList.add("popup-save");
  saveBtn.textContent = "Save";
  div.appendChild(saveBtn);

  saveBtn.addEventListener("click", ()=> {
    new ProjectManager(name.value);
    Sidebar.populateProjects();
    Popup.remove();
  })

  return div;
}

// then make it work prob in mangers
