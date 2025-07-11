  import { toggleWidth } from "./toggleWidthAnim";
  import menuImg from "./icons/menu.svg"

  export function assignSidebarAnimation() {
    let animRef = null;


    const animationTime = 200;
    const sidebar = document.querySelector("#sidebar");
    const openBtn = document.querySelector("#open-btn");
    const closeBtn = document.querySelector("#close-btn");

    openBtn.src = menuImg;
    closeBtn.src = menuImg;

    const sidebarWidth = window
      .getComputedStyle(document.body)
      .getPropertyValue("--sidebar-width");

    openBtn.addEventListener("click", () => {
      toggleWidth(sidebar, "0", sidebarWidth, animationTime);

      openBtn.style.transition = "opacity 0.17s";
      openBtn.style.opacity = "0%";
      animRef = setTimeout(() => {
        animRef = null;
        openBtn.style.visibility = "collapse";
      }, 500);
        setTimeout(()=> {

        closeBtn.style.transition = "opacity 0.4s";
        closeBtn.style.opacity = "100%";
        },230)
    });

    closeBtn.addEventListener("click", () => {
      clearTimeout(animRef);
      toggleWidth(sidebar, sidebarWidth, "0", animationTime);
      openBtn.style.visibility = "visible";
      closeBtn.style.transition = "opacity 0.4s";
      closeBtn.style.opacity = "0%";
      setTimeout(() => {
        openBtn.style.transition = "opacity 0.5s";
        openBtn.style.opacity = "100%";
      }, 200);
    });
  }