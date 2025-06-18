import { describe, it, expect, vi, beforeEach } from "vitest";
import { __only_for_test as ui } from "../../src/expenses-list/show-expenses.js";
import { appendDeleteButton } from "../../src/expenses-list/delete-button.js";

vi.mock("../../src/expenses-list/delete-button.js", () => ({
  appendDeleteButton: vi.fn(),
}));

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
    const expenses = [
      {
        displayDate: "17-06-2025",
        description: "Pizza",
        amount: 10,
        category: "Eten",
      },
      {
        displayDate: "15-06-2025",
        description: "Boek",
        amount: 25.99,
        category: "School",
      },
    ];

    ui.renderExpenses(container, expenses);
    const items = container.querySelectorAll("li");
    expect(items).toHaveLength(2);

    expect(items[0].textContent).toContain("15-06-2025");
    expect(items[0].textContent).toContain("Boek");
    expect(items[0].textContent).toContain("€25.99");
    expect(items[0].textContent).toContain("School");

    expect(items[1].textContent).toContain("17-06-2025");
    expect(items[1].textContent).toContain("Pizza");
    expect(items[1].textContent).toContain("€10.00");
    expect(items[1].textContent).toContain("Eten");
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

  it("voegt deleteknoppen toe via appendDeleteButton", () => {
    vi.clearAllMocks();

    const expenses = [
      {
        id: "1",
        description: "Aankoop A",
        amount: 10,
        displayDate: "01-01-2025",
        category: "Algemeen",
      },
      {
        id: "2",
        description: "Aankoop B",
        amount: 20,
        displayDate: "02-01-2025",
        category: "Algemeen",
      },
    ];

    ui.renderExpenses(container, expenses);

    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(2);

    expect(appendDeleteButton).toHaveBeenCalledTimes(2);
    expect(appendDeleteButton).toHaveBeenNthCalledWith(
      1,
      listItems[0],
      container,
      expenses[1]
    ); // reversed
    expect(appendDeleteButton).toHaveBeenNthCalledWith(
      2,
      listItems[1],
      container,
      expenses[0]
    );
  });
});
