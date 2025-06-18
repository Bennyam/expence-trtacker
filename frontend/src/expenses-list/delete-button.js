import { removeExpense } from "../expenses-delete/remove-expense";
import { showExpenses } from "./show-expenses";
import { showError } from "../ui-helpers";

export async function onDeleteButtonClicked(element, expense) {
  const result = await removeExpense(expense.id);

  if (result.success) {
    await showExpenses(element);
  } else {
    showError(element, result.error);
  }
}

export function appendDeleteButton(parent, element, expense) {
  const button = document.createElement("button");
  button.className = "confirm-delete";

  const trash = document.createElement("span");
  trash.className = "trash-icon";
  trash.textContent = "X";

  const label = document.createElement("span");
  label.className = "confirm-label";
  label.textContent = "Zeker?";

  label.addEventListener("click", () => {
    onDeleteButtonClicked(element, expense);
  });

  button.appendChild(trash);
  button.appendChild(label);
  parent.appendChild(button);
}

export const __only_for_test = {
  onDeleteButtonClicked,
  appendDeleteButton,
};
