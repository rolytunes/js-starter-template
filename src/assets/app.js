import { tween } from "popmotion";
import "./app.scss";

export default function component() {
  const element = document.createElement("h2", { class: "w-16" });
  element.innerHTML = "Hello JS";
  return element;
}
