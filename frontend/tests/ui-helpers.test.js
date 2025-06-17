import { describe, it, expect, beforeEach } from "vitest";
import { showError } from "../src/ui-helpers";

describe("showError", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
  });

  it("toont foutmelding in rood", () => {
    showError(container, "Foutje");
    const p = container.querySelector("p");
    expect(p.textContent).toBe("Foutje");
    expect(p.style.color).toBe("red");
  });
});
