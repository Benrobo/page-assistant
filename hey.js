import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver();
driverObj.highlight({
  element: "#button1",
  popover: {
    title: "Title",
    description: "Description",
  },
});
