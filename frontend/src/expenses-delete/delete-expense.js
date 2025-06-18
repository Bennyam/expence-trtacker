export async function deleteExpense(id) {
  const response = await fetch(`http://localhost:3000/expenses/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete expense: ${response.status}`);
  }
}
