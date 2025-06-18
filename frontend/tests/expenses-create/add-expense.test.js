import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  validateFormData,
  addExpense,
} from "../../src/expenses-create/add-expense";
import { __only_for_test as formData } from "../../src/expenses-create/add-expense";
import { createExpense } from "../../src/expenses-create/post-expense";

vi.mock("../../src/expenses-create/post-expense");

describe("validateFormData", () => {
  it("faalt zonder description", () => {
    const result = formData.validateFormData({
      amount: 10,
      date: "2025/06/17",
    });
    expect(result).toEqual({
      success: false,
      error: "Omschrijving is verplicht.",
    });
  });

  it("faalt als amount geen getal is", () => {
    const result = formData.validateFormData({
      description: "Test",
      amount: "abc",
      date: "2025/06/17",
    });
    expect(result).toEqual({
      success: false,
      error: "Bedrag moet een getal zijn.",
    });
  });

  it("faalt als amount <= 0", () => {
    const result = formData.validateFormData({
      description: "Test",
      amount: 0,
      date: "2025/06/17",
    });
    expect(result).toEqual({
      success: false,
      error: "Bedrag moet positief zijn.",
    });
  });

  it("faalt als datum ongeldig is", () => {
    const result = formData.validateFormData({
      description: "Test",
      amount: 10,
      date: "invalid-date",
    });
    expect(result).toEqual({ success: false, error: "Ongeldige datum." });
  });

  it("accepteert datum met /", () => {
    const result = formData.validateFormData({
      description: "Test",
      amount: 10,
      date: "2025/06/17",
    });
    expect(result).toEqual({ success: true });
  });

  it("accepteert datum met -", () => {
    const result = formData.validateFormData({
      description: "Test",
      amount: 10,
      date: "2025-06-17",
    });
    expect(result).toEqual({ success: true });
  });
});

describe("addExpense", () => {
  const validData = { description: "Test", amount: 10, date: "2025/06/17" };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("voert geen API-call uit bij validatiefout", async () => {
    const result = await addExpense({ amount: 10, date: "2025/06/17" });
    expect(result).toEqual({
      success: false,
      error: "Omschrijving is verplicht.",
    });
    expect(createExpense).not.toHaveBeenCalled();
  });

  it("roept createExpense aan bij geldige data", async () => {
    createExpense.mockResolvedValueOnce({ id: 1 });

    const result = await addExpense(validData);
    expect(createExpense).toHaveBeenCalledWith(validData);
    expect(result).toEqual({ success: true });
  });

  it("geeft fout terug bij API-fout", async () => {
    createExpense.mockRejectedValueOnce(new Error("Server kapot"));

    const result = await addExpense(validData);
    expect(result).toEqual({ success: false, error: "Server kapot" });
  });
});
