import { describe, it, expect, vi, beforeEach } from "vitest";
import { getExpensesData } from "../../src/expenses-list/fetch-expenses";

describe("getExpensesData", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("haalt correct data op", async () => {
    const mockData = [
      { id: "1a2b3c", description: "Lunch bij Broodje Mario", amount: 8.5 },
    ];

    // Mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const data = await getExpensesData();
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/expenses");
  });

  it("gooit een fout als de response niet ok is", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    await expect(getExpensesData()).rejects.toThrow("Could not load the data");
  });
});
