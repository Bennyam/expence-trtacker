import { describe, it, expect, vi } from "vitest";

vi.mock("../../src/expenses-list/fetch-expenses.js", () => ({
  getExpensesData: vi.fn(),
}));

import {
  getExpenses,
  __only_for_test as internal,
} from "../../src/expenses-list/format-expenses.js";
import { getExpensesData } from "../../src/expenses-list/fetch-expenses.js";

describe("getExpenses", () => {
  it("geeft success: true bij geldige data", async () => {
    const mockData = [
      {
        id: "1",
        description: "Test Expense",
        amount: 10,
        date: "2025-06-12",
        category: "Test",
      },
    ];

    getExpensesData.mockResolvedValueOnce(mockData);

    const result = await getExpenses();
    expect(result.success).toBe(true);
    expect(result.expenses).toHaveLength(1);
    expect(result.expenses[0]).toHaveProperty("displayDate");
  });

  it("geeft success: false bij lege array", async () => {
    getExpensesData.mockResolvedValueOnce([]);

    const result = await getExpenses();
    expect(result.success).toBe(false);
    expect(result.error).toBe("Data could not get loaded");
  });
});
