import { deleteExpense } from "./delete-expense.js";

export function removeExpense(id) {
  return deleteExpense(id)
    .then(() => ({ success: true }))
    .catch((error) => ({ success: false, error: error.message }));
}
