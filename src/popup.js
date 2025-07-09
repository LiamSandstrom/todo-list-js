export class Popup {
  static #currentPopup;

  static render(popup) {
    Popup.#currentPopup = document.createElement("dialog");
    console.log(popup)
    console.log(popup)
    Popup.#currentPopup.appendChild(popup);

    document.body.appendChild(Popup.#currentPopup);
    Popup.#addClickOutsideRemove();
    Popup.#currentPopup.showModal();
  }

  static remove() {
    if (Popup.#currentPopup == null) return;

    document.body.removeChild(Popup.#currentPopup);
  }

  static #addClickOutsideRemove() {
    Popup.#currentPopup.addEventListener("click", (e) => {
      const dialogDimensions = Popup.#currentPopup.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        Popup.remove();
      }
    });
  }
}
