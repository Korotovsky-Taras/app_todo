import "./index.pug";
import "./index.scss";
import {TodoManager} from "./components/manager/manager";

window.addEventListener('DOMContentLoaded', () => {
  new TodoManager(document.body)
});
