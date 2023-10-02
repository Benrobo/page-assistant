import PageAssistant from "./lib/assistant";

new PageAssistant()
  .loadAssets("./lib/assets/assistant.gif")
  .inject()
  .highlight({
    steps: [
      {
        element: "#button12",
        info: {
          title: "Some title here",
          //   description: "some description",
        },
      },
      {
        element: "#button1",
        info: {
          title: "Some title here",
          description: "some description",
        },
      },
    ],
  });
