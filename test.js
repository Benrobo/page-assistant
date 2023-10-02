import PageAssistant from "./lib/assistant";

new PageAssistant()
  .loadAssets("./lib/assets/assistant.gif")
  .inject()
  .highlight({
    steps: [
      {
        element: "#button2",
        info: {
          title: "Some title here",
          description: "some description",
        },
      },
      {
        element: "#button1",
        info: {
          title: "Some title here",
          description: "some description",
        },
      },
      {
        element: "#button3",
        info: {
          title: "Some title here",
          description: "some description",
        },
      },
      {
        element: "#button4",
        info: {
          title: "Some title here",
          description: "some description",
        },
      },
    ],
  });
