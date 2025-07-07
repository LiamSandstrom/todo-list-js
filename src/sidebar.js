
export class Sidebar {
    #container;
    #sidebarDiv;
    #topbarDiv;
    #username;
    #onButton;

    constructor(container){
        this.#container = container;
        this.#sidebarDiv = document.createElement("div");
        this.#topbarDiv = document.createElement("div");
        this.#username = document.createElement("p")
        this.#onButton = document.createElement("button")
    }

    render(){
        this.#sidebarDiv.id = "sidebar";
        this.#topbarDiv.classList.add("topbar");

        this.#username.textContent = "Username"
        this.#onButton.textContent = "III"
        this.#onButton.id= "close-btn"
        this.#topbarDiv.appendChild(this.#username)
        this.#topbarDiv.appendChild(this.#onButton)

        this.#sidebarDiv.appendChild(this.#topbarDiv)
        this.#container.appendChild(this.#sidebarDiv)
    }

}
