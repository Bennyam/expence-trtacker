import { addExpense } from "./add-expense.js";
import { showExpenses } from "../expenses-list/show-expenses.js";
import { showError } from "../ui-helpers.js";

export async function submitExpense(form) {
  const formData = new FormData(form);
  const data = {
    description: formData.get("description"),
    amount: Number(formData.get("amount")),
    date: formData.get("date"),
    category: formData.get("category"),
  };
  return await addExpense(data);
}

export async function updateUI(form, element, result) {
  if (result.success) {
    form.reset();
    await showExpenses(element);
  } else {
    showError(element, result.error);
  }
}

export function bindFormSubmit(form, element) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const result = await submitExpense(form);
    await updateUI(form, element, result);
  });
}

// Alleen voor testdoeleinden exporteren
export const __only_for_test = {
  submitExpense,
  updateUI,
};
