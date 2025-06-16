import { getExpenses } from "./format-expenses.js";

function clearElement(element) {
  element.innerHTML = "";
}

function showLoading(element) {
  clearElement(element);
  const p = document.createElement("p");
  p.textContent = "Loading...";
  element.appendChild(p);
}

function showError(element, error) {
  clearElement(element);
  const p = document.createElement("p");
  p.textContent = error;
  p.style.color = "red";
  element.appendChild(p);
}

function showEmptyState(element) {
  clearElement(element);
  const p = document.createElement("p");
  p.textContent = "No expenses found.";
  element.appendChild(p);
}

function renderExpenses(element, expenses) {
  clearElement(element);
  if (!expenses.length) {
    showEmptyState(element);
    return;
  }

  const ul = document.createElement("ul");
  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.textContent = `${expense.description} - €${expense.amount.toFixed(2)}`;
    ul.appendChild(li);
  });

  element.appendChild(ul);
}

export async function showExpenses(element) {
  showLoading(element);

  try {
    const result = await getExpenses();
    if (result.success) {
      renderExpenses(element, result.expenses);
    } else {
      showError(element, result.error);
    }
  } catch (err) {
    showError(element, "Something went wrong dude");
  }
}

export const __only_for_test = {
  showLoading,
  showError,
  showEmptyState,
  renderExpenses,
  showExpenses,
};
