import { getExpensesData } from "./fetch-expenses.js";

export function formatExpenses(expenses) {
  return expenses.map((expense) => {
    let displayDate = "Onbekende datum";

    if (expense.date && !isNaN(new Date(expense.date))) {
      displayDate = new Date(expense.date).toLocaleDateString();
    }

    return {
      ...expense,
      displayDate,
    };
  });
}

export const getExpenses = async function () {
  const error = "Data could not get loaded";
  const data = await getExpensesData();
  const expenses = formatExpenses(data);

  console.log(expenses);

  if (!data.length || !expenses.length) return { success: false, error };
  else return { success: true, expenses };
};

export const __only_for_test = { formatExpenses };
