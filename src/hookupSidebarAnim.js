  export function assignSidebarAnimation() {
    let animRef = null;

    const animationTime = 250;
    const sidebar = document.querySelector("#sidebar");
    const openBtn = document.querySelector("#open-btn");
    const closeBtn = document.querySelector("#close-btn");

    const sidebarWidth = window
      .getComputedStyle(document.body)
      .getPropertyValue("--sidebar-width");

    openBtn.addEventListener("click", () => {
      toggleWidth(sidebar, "0", sidebarWidth, animationTime);
      openBtn.style.transition = "opacity 0.4s";
      openBtn.style.opacity = "0%";

      animRef = setTimeout(() => {
        animRef = null;
        openBtn.style.visibility = "collapse";
      }, 400);
    });

    closeBtn.addEventListener("click", () => {
      clearTimeout(animRef);
      toggleWidth(sidebar, sidebarWidth, "0", animationTime);
      openBtn.style.visibility = "visible";
      setTimeout(() => {
        openBtn.style.transition = "opacity 0.5s";
        openBtn.style.opacity = "100%";
      }, 50);
    });
  }