class Log {
  static success(...params) {
    console.log(
      `%c[PA Success]`,
      "color: #39ff16; font-weight: bold;",
      ...params
    );
  }
  static error(...params) {
    console.log(
      `%c[PA Error]:`,
      "color: #ff4741; font-weight: bold;",
      ...params
    );
  }
  static info(...params) {
    console.log(
      `%c[PA Info]:`,
      "color: #ff5a00; font-weight: bold;",
      ...params
    );
  }
}

let log = Log;

export default class PageAssistant {
  #imgPath = null;
  #loading = false;
  #missingElements = [];
  #validationErrors = [];
  #$select = (elem) => document.querySelector(elem);
  #$selectAll = (elem) => document.querySelectorAll(elem);
  #$createElement = (elem) => document.createElement(elem);

  constructor() {}

  #empty(string) {
    if (string === null || string.length === 0 || typeof string === "undefined")
      return true;
    else return false;
  }

  #elementExists(selector) {
    // Implement your logic to check if the element exists in the DOM
    // Return true if the element exists, false otherwise
    return document.querySelector(selector) !== null;
  }

  #validate(props) {
    if (this.#empty(props?.steps)) {
      log.error("Expected a valid 'steps' array of objects, but got none");
      return false;
    }

    props.steps.forEach((step, index) => {
      if (!this.#elementExists(step.element)) {
        this.#missingElements.push(step.element);
        this.#validationErrors.push(
          `Element at index ${index} does not exist: ${step.element}`
        );
      }

      if (!step.info || !step.info.title || !step.info.description) {
        this.#validationErrors.push(
          `Element at index ${index} is missing info properties: ${step.element}`
        );
      }
    });

    if (this.#missingElements.length > 0) {
      const msg =
        props?.steps.length > 1
          ? "The following elements do not exist:"
          : "Missing element";
      const missingElements =
        props?.steps.length > 1
          ? this.#missingElements
          : this.#missingElements[0];
      log.error(msg, missingElements);
    }

    if (this.#validationErrors.length > 0) {
      this.#validationErrors.forEach((error) => log.error(error));
    }
  }

  #filterAvailableElements(steps) {
    const availableElements = steps.filter(
      (e, idx) => e.element !== this.#missingElements[idx]
    );
    return availableElements;
  }

  loadAssets(imgPath) {
    if (this.#empty(imgPath)) {
      log.error("Error loading assets");
      return this;
    }
    const img = new Image();
    let error = false;
    img.onload = () => {
      this.#imgPath = imgPath;
    };

    img.onerror = () => {
      log.error("Error loading assets");
      error = true;
    };

    img.src = imgPath;
    return this;
  }

  inject() {
    const mainDiv = this.#$createElement("div");
    mainDiv.innerHTML = `
        <div class="pa-assist-container">
        <img
            src="./lib/assets/assistant2.gif"
            class="pa-assist-img"
            alt=""
            srcset=""
        />
        <div class="pa-assist-content hide right">
            <p>Title</p>
            <span>Content</span>
        </div>
        </div>
    `;
    document.body.appendChild(mainDiv);
    return this;
  }

  highlight(
    props = {
      steps: [
        {
          element: "#test",
          info: { title: "test", description: "test" },
        },
      ],
    }
  ) {
    // validate the params
    this.#validate(props);

    // checks if the elements steps < missing elements
    // if it true, then we dont do any thing, else, we filter out
    // elements that were found
    if (props?.steps.length > this.#missingElements.length) {
      // continue the flow
      const availableElements = this.#filterAvailableElements(props?.steps);
      availableElements.forEach((elem) => {
        this.#$select(elem.element).onclick = (e) => {
          const target = e.target;
          const rect = target.getBoundingClientRect();
          const paContent = this.#$select(".pa-assist-content");
          const paContainer = this.#$select(".pa-assist-container");
          // element info
          const title = elem?.info?.title ?? "N/A";
          const description = elem?.info?.description ?? "N/A";

          // Mouse position
          const x = e.clientX;
          const y = e.clientY;

          // Position paContainer at the click coordinates
          paContainer.style.position = "absolute";
          paContainer.style.top = `${y}px`;
          paContainer.style.left = `${x}px`;
          paContainer.style.inset = `${y} ${x} auto auto`;
          console.log(x > 300);
          if ((x > 100) & (y < 100)) {
            paContent.classList.remove("left");
            paContent.classList.add("right");
          } else {
            paContent.classList.remove("right");
            paContent.classList.add("left");
          }

          paContent.innerHTML = `
            <p>${title}</p>
            <span>${description}</span>
          `;
          paContent.classList.remove("hide");
          paContent.classList.add("show");
          console.log([x, y]);
        };
      });
    } else {
      log.info("Missing elements, please check configurations.");
    }
  }

  hey() {
    setTimeout(() => {
      console.log(this.#imgPath);
      log.success(this.#imgPath);
    }, 1000);
  }
}
