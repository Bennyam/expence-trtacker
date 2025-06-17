import { describe, it, expect, vi, beforeEach } from "vitest";
import { __only_for_test as formUtils } from "../../src/expenses-create/bind-form.js";
import { addExpense } from "../../src/expenses-create/add-expense";
import { showExpenses } from "../../src/expenses-list/show-expenses";
import { showError } from "../../src/ui-helpers";

vi.mock("../../src/expenses-create/add-expense", () => ({
  addExpense: vi.fn(),
}));
vi.mock("../../src/expenses-list/show-expenses", () => ({
  showExpenses: vi.fn(),
}));
vi.mock("../../src/ui-helpers", () => ({
  showError: vi.fn(),
}));

describe("submitExpense", () => {
  let form;

  beforeEach(() => {
    form = document.createElement("form");
    form.innerHTML = `
      <input name="description" value="Koffie" />
      <input name="amount" value="2.5" />
      <input name="date" value="2025-06-17" />
    `;
  });

  it("leest formwaarden en roept addExpense aan", async () => {
    addExpense.mockResolvedValueOnce({ success: true });

    const result = await formUtils.submitExpense(form);
    expect(addExpense).toHaveBeenCalledWith({
      description: "Koffie",
      amount: "2.5",
      date: "2025-06-17",
    });
    expect(result).toEqual({ success: true });
  });
});

describe("updateUI", () => {
  let form, container;

  beforeEach(() => {
    form = document.createElement("form");
    form.reset = vi.fn(); // mock reset
    container = document.createElement("div");
  });

  it("reset en herlaadt de lijst bij succes", async () => {
    const result = { success: true };
    await formUtils.updateUI(form, container, result);
    expect(form.reset).toHaveBeenCalled();
    expect(showExpenses).toHaveBeenCalledWith(container);
  });

  it("toont foutmelding bij failure", async () => {
    const result = { success: false, error: "Oeps!" };
    await formUtils.updateUI(form, container, result);
    expect(showError).toHaveBeenCalledWith(container, "Oeps!");
  });
});
