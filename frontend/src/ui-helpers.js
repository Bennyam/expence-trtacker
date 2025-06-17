import { clearElement } from "./expenses-list/show-expenses.js";

export function showError(element, error) {
  clearElement(element);
  const p = document.createElement("p");
  p.textContent = error;
  p.style.color = "red";
  element.appendChild(p);
}
