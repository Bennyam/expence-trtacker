import { describe, it, expect } from "vitest";
import { __only_for_test } from "../../src/expenses-list/format-expenses";

const { formatExpenses } = __only_for_test;

describe("formatExpenses", () => {
  const input = [
    {
      id: "1a2b3c",
      description: "Lunch bij Broodje Mario",
      amount: 8.5,
      date: "2025-06-12",
      category: "Eten",
    },
    {
      id: "4d5e6f",
      description: "Treinticket Gent → Brussel",
      amount: 9.2,
      date: "2025-06-11",
      category: "Transport",
    },
    {
      id: "7g8h9i",
      description: "Boek 'Clean Code'",
      amount: 34.95,
      date: "2025-06-10",
      category: "Educatie",
    },
  ];

  it("voegt displayDate toe in juiste formaat", () => {
    const result = formatExpenses(input);

    expect(result).toHaveLength(3);

    result.forEach((expense, i) => {
      expect(expense).toHaveProperty("displayDate");
      expect(typeof expense.displayDate).toBe("string");
    });

    // Optioneel: check specifieke waarde, afhankelijk van locale
    const expectedDate = new Date("2025-06-12").toLocaleDateString();
    expect(result[0].displayDate).toBe(expectedDate);
  });
});
