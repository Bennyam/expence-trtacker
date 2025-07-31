export async function deleteExpense(id) {
  const response = await fetch(`http://localhost:5270/api/Expence/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete expense: ${response.status}`);
  }
}
