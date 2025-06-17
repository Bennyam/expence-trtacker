import { createExpense } from "./post-expense.js";

export function validateFormData(data) {
  const { description, amount, date } = data;

  if (!description || description.trim() === "") {
    return { success: false, error: "Omschrijving is verplicht." };
  }

  if (amount === undefined || amount === null || isNaN(amount)) {
    return { success: false, error: "Bedrag moet een getal zijn." };
  }

  const parsedAmount = Number(amount);
  if (parsedAmount <= 0) {
    return { success: false, error: "Bedrag moet positief zijn." };
  }

  if (!date || typeof date !== "string") {
    return { success: false, error: "Datum is verplicht." };
  }

  const cleanedDate = date.replace(/\//g, "-");
  const parsedDate = new Date(cleanedDate);

  if (isNaN(parsedDate.getTime())) {
    return { success: false, error: "Ongeldige datum." };
  }

  return { success: true };
}

export async function addExpense(data) {
  const validation = validateFormData(data);
  if (!validation.success) {
    return validation;
  }

  try {
    await createExpense(data);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
