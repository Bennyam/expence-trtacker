import { describe, it, expect, vi, beforeEach } from "vitest";
import { __only_for_test as ui } from "../../src/expenses-list/show-expenses.js";

vi.mock("../../src/expenses-list/format-expenses.js", () => ({
  getExpenses: vi.fn(),
}));
import { getExpenses } from "../../src/expenses-list/format-expenses.js";

describe("UI rendering", () => {
  let container;

  const getText = () => container.textContent.trim();
  const pText = () => container.querySelector("p")?.textContent;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.innerHTML = "";
    document.body.appendChild(container);
  });

  it("toont loading", () => {
    ui.showLoading(container);
    expect(getText()).toBe("Loading...");
  });

  it("toont empty state", () => {
    ui.showEmptyState(container);
    expect(getText()).toBe("No expenses found.");
  });

  it("toont empty state bij lege lijst", () => {
    ui.renderExpenses(container, []);
    expect(getText()).toBe("No expenses found.");
  });

  it("toont lijst van expenses", () => {
    ui.renderExpenses(container, [
      { description: "Pizza", amount: 10 },
      { description: "Boek", amount: 25.99 },
    ]);
    const items = container.querySelectorAll("li");
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toBe("Pizza - €10.00");
    expect(items[1].textContent).toBe("Boek - €25.99");
  });

  it("showExpenses: toont lijst bij success", async () => {
    getExpenses.mockResolvedValueOnce({
      success: true,
      expenses: [{ description: "Koffie", amount: 3.5 }],
    });

    await ui.showExpenses(container);
    expect(container.querySelector("ul")).toBeTruthy();
    expect(getText()).toContain("Koffie - €3.50");
  });

  it("showExpenses: toont foutmelding bij failure", async () => {
    getExpenses.mockResolvedValueOnce({
      success: false,
      error: "Something went wrong dude",
    });

    await ui.showExpenses(container);
    expect(pText()).toBe("Something went wrong dude");
  });

  it("showExpenses: toont fallback bij thrown error", async () => {
    getExpenses.mockRejectedValueOnce(new Error("Kapot"));

    await ui.showExpenses(container);
    expect(pText()).toBe("Something went wrong dude");
  });
});
