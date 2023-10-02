class Log {
  static success(...params) {
    console.log(
      `%c[PageAssistant Success]`,
      "color: #39ff16; font-weight: bold;",
      ...params
    );
  }
  static error(...params) {
    console.log(
      `%c[PageAssistant Error]:`,
      "color: #ff4741; font-weight: bold;",
      ...params
    );
  }
}

let log = Log;

export default class PageAssistant {
  #imgPath = null;
  #loading = false;
  constructor() {}

  #empty(string) {
    if (string === null || string.length === 0 || typeof string === "undefined")
      return true;
    else return false;
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

  hey() {
    setTimeout(() => {
      console.log(this.#imgPath);
      log.success(this.#imgPath);
    }, 1000);
  }
}
