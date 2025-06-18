import { describe, it, expect, vi, beforeEach } from "vitest";
import { __only_for_test as btnUtils } from "../../src/expenses-list/delete-button.js";
import { removeExpense } from "../../src/expenses-delete/remove-expense.js";
import { showExpenses } from "../../src/expenses-list/show-expenses.js";
import { showError } from "../../src/ui-helpers.js";

vi.mock("../../src/expenses-delete/remove-expense.js", () => ({
  removeExpense: vi.fn(),
}));

vi.mock("../../src/expenses-list/show-expenses.js", () => ({
  showExpenses: vi.fn(),
}));

vi.mock("../../src/ui-helpers.js", () => ({
  showError: vi.fn(),
}));

describe("onDeleteButtonClicked", () => {
  const element = document.createElement("div");
  const expense = { id: "abc123" };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("roept showExpenses bij succes", async () => {
    removeExpense.mockResolvedValueOnce({ success: true });

    await btnUtils.onDeleteButtonClicked(element, expense);

    expect(removeExpense).toHaveBeenCalledWith("abc123");
    expect(showExpenses).toHaveBeenCalledWith(element);
    expect(showError).not.toHaveBeenCalled();
  });

  it("roept showError bij fout", async () => {
    removeExpense.mockResolvedValueOnce({
      success: false,
      error: "Verwijderen mislukt",
    });

    await btnUtils.onDeleteButtonClicked(element, expense);

    expect(showExpenses).not.toHaveBeenCalled();
    expect(showError).toHaveBeenCalledWith(element, "Verwijderen mislukt");
  });
});

describe("appendDeleteButton", () => {
  const container = document.createElement("div");
  const appElement = document.createElement("div");
  const expense = { id: "123" };

  beforeEach(() => {
    container.innerHTML = "";
  });

  it("voegt een knop toe met juiste structuur en klassen", () => {
    btnUtils.appendDeleteButton(container, appElement, expense);

    const button = container.querySelector("button.confirm-delete");
    expect(button).toBeTruthy();

    const trash = button.querySelector("span.trash-icon");
    const label = button.querySelector("span.confirm-label");

    expect(trash).toBeTruthy();
    expect(trash.textContent).toBe("X");

    expect(label).toBeTruthy();
    expect(label.textContent).toBe("Zeker?");
  });
});
