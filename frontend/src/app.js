import { showExpenses } from "./expenses-list/show-expenses.js";
import { bindFormSubmit } from "./expenses-create/bind-form.js";

window.addEventListener("DOMContentLoaded", () => {
  const appElement = document.getElementById("app");
  const formElement = document.getElementById("expense-form");

  if (appElement) {
    showExpenses(appElement);
  }

  if (formElement && appElement) {
    bindFormSubmit(formElement, appElement);
  }
});
