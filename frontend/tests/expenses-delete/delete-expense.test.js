import { it, expect, describe, vi, beforeEach } from "vitest";
import { deleteExpense } from "../../src/expenses-delete/delete-expense";

global.fetch = vi.fn();

describe("deleteExpense", () => {
  const id = "123";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("verstuurt DELETE en geeft geen fout bij status 200", async () => {
    fetch.mockResolvedValueOnce({ ok: true, status: 200 });

    await expect(deleteExpense(id)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/expenses/${id}`, {
      method: "DELETE",
    });
  });

  it("verstuurt DELETE en geeft geen fout bij status 204", async () => {
    fetch.mockResolvedValueOnce({ ok: true, status: 204 });

    await expect(deleteExpense(id)).resolves.toBeUndefined();
  });

  it("gooit fout bij niet-ok status (bv. 404)", async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404 });

    await expect(deleteExpense(id)).rejects.toThrow(
      "Failed to delete expense: 404"
    );
  });

  it("gooit fout bij netwerkfout", async () => {
    fetch.mockRejectedValueOnce(new Error("Netwerkfout"));

    await expect(deleteExpense(id)).rejects.toThrow("Netwerkfout");
  });
});
