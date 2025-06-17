import { describe, it, expect, vi, beforeEach } from "vitest";
import { createExpense } from "../../src/expenses-create/post-expense";

global.fetch = vi.fn();

describe("createExpense", () => {
  const data = {
    description: "Test aankoop",
    amount: 25.5,
    date: "2025-06-17",
    displayDate: "17-06-2025",
    category: "test",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("stuurt een succesvolle POST en retourneert JSON", async () => {
    const mockResponse = { id: 1, ...data };
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => mockResponse,
    });

    const result = await createExpense(data);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/expenses",
      expect.objectContaining({
        method: "POST",
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it("gooit een fout bij response.ok = false", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({}),
    });

    await expect(createExpense(data)).rejects.toThrow(
      "Failed to create expense: 400"
    );
  });

  it("gooit een fout bij netwerkfout", async () => {
    fetch.mockRejectedValueOnce(new Error("Network Error"));

    await expect(createExpense(data)).rejects.toThrow("Network Error");
  });
});
