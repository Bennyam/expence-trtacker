import { describe, it, expect, vi, beforeEach } from "vitest";
import { removeExpense } from "../../src/expenses-delete/remove-expense.js";
import { deleteExpense } from "../../src/expenses-delete/delete-expense.js";

vi.mock("../../src/expenses-delete/delete-expense.js", () => ({
  deleteExpense: vi.fn(),
}));

describe("removeExpense", () => {
  const id = "abc123";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("geeft success true bij geslaagde delete", async () => {
    deleteExpense.mockResolvedValueOnce();

    const result = await removeExpense(id);
    expect(deleteExpense).toHaveBeenCalledWith(id);
    expect(result).toEqual({ success: true });
  });

  it("geeft success false bij fout tijdens delete", async () => {
    deleteExpense.mockRejectedValueOnce(new Error("Niet gevonden"));

    const result = await removeExpense(id);
    expect(result).toEqual({ success: false, error: "Niet gevonden" });
  });
});
