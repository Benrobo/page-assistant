import PageAssistant from "./lib/assistant";

const assist = new PageAssistant();

function initializeAssistant() {
  assist.loadAssets("./lib/assets/assistant.gif").hey();
}

initializeAssistant();
