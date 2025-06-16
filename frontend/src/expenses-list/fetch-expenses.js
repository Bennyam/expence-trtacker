const getExpensesData = async function () {
  const res = await fetch("http://localhost:3000/expenses");
  const data = await res.json();

  if (!res.ok) throw new Error("Could not load the data");

  return data;
};

export { getExpensesData };
