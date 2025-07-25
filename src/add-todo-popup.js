import { Popup } from "./popup";
import { Page } from "./render-page";
import { Storage } from "./storage";
import { TodoItem } from "./todo-item";

export function todoPopup(project, key = null) {
  const div = document.createElement("div");
  div.classList.add("todo-popup");

  const todoTitle = document.createElement("p");
  todoTitle.textContent = "Todo Item 📒";
  div.appendChild(todoTitle);

  const text = document.createElement("p");

  const title = document.createElement("input");
  const desc = document.createElement("textarea");
  const dueDate = document.createElement("input");
  dueDate.type = "date";
  const prio = document.createElement("select");
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";

  title.maxLength = "30";
  desc.maxLength = "250";
  dueDate.min = new Date().toISOString().split("T")[0];

  title.placeholder = "Title...";
  desc.placeholder = "Description...";

  title.classList.add("popup-title");
  desc.classList.add("popup-desc");
  dueDate.classList.add("popup-duedate");
  prio.classList.add("popup-prio");
  saveBtn.classList.add("popup-save");

  //prio dropdown
  const prio1 = document.createElement("option");
  const prio2 = document.createElement("option");
  const prio3 = document.createElement("option");
  prio1.value = "1";
  prio2.value = "2";
  prio3.value = "3";
  prio1.textContent = "Priority: 1";
  prio2.textContent = "Priority: 2";
  prio3.textContent = "Priority: 3";
  prio.appendChild(prio1);
  prio.appendChild(prio2);
  prio.appendChild(prio3);

  div.appendChild(title);
  div.appendChild(desc);
  div.appendChild(dueDate);
  div.appendChild(prio);
  div.appendChild(saveBtn);

  div.appendChild(text);

  //edit todo on save
  if (key != null) {
    const todo = project.getItem(key);
    if(project.getItem(key) == undefined) return undefined;
    title.value = todo.getTitle();
    desc.value = todo.getDescription();
    dueDate.value = todo.getDueDate();
    prio.value = todo.getPriority();

    saveBtn.addEventListener("click", () => {
      const todo = project.getItem(key);
      todo.setTitle(title.value);
      todo.setDescription(desc.value);
      todo.setDueDate(dueDate.value);
      todo.setPriority(prio.value);

      Page.loadPage();
      Popup.remove();
      Storage.setStorage();
    });
  }

  //create todo on save
  else {
    saveBtn.addEventListener("click", () => {
      new TodoItem(project, title.value, desc.value, dueDate.value, prio.value);
      console.log(project)

      Popup.remove();
      Page.loadPage();
    });
  }

  return div;
}
