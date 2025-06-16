import { getExpensesData } from "./fetch-expenses.js";

function formatExpenses(expenses) {
  return expenses.map(
    (expense) =>
      (expense = {
        ...expense,
        displayDate: new Date(expense.date).toLocaleDateString(),
      })
  );
}

export const __only_for_test = { formatExpenses };

export const getExpenses = async function () {
  const error = "Data could not get loaded";
  const data = await getExpensesData();
  const expenses = formatExpenses(data);

  if (!data.length || !expenses.length) return { success: false, error };
  else return { success: true, expenses };
};
