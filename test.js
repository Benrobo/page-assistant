import PageAssistant from "./lib/assistant";

const assist = new PageAssistant();

function initializeAssistant() {
  assist.loadAssets("./lib/assets/assistant.gif").highlight({
    steps: [
      {
        element: "#button1",
        info: {
          title: "Some title here",
          description: "some description",
        },
      },
    ],
  });
}

initializeAssistant();
