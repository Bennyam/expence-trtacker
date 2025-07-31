export async function createExpense(data) {
  const response = await fetch("http://localhost:5270/api/Expence", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok)
    throw new Error(`Failed to create expense: ${response.status}`);

  return await response.json();
}
